import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {TokenStorageService} from "../token/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements AfterViewInit {

  displayedColumns: string[] = ['created_at','increment_id', 'email', 'total_qty_ordered', 'grand_total'];
  exampleDatabase: ExampleHttpDatabase | null = null;
  data: MagentoOrder[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort =  <MatSort>{};

  constructor(
    private _httpClient: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
    ) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient, this.tokenStorage);

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(
            catchError(err => {
              console.error(err);
              if (err.status == 401) {
                this.tokenStorage.resetTokenFromCookie()
              }
              return observableOf(null);
            })
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.total_count;
          return data.items;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  logout() {
    this.tokenStorage.resetTokenFromCookie();
    this.router.navigate(['/login']);
  }
  home() {
    this.router.navigate(['/']);
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

export interface MagentoOrders {
  items: MagentoOrder[];
  total_count: number;
}

export interface MagentoOrder {
  created_at: string;
  increment_id: string;
  customer_email: string;
  grand_total: number;
  total_qty_ordered: number;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient, private tokenStorage: TokenStorageService) {}

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<MagentoOrders> {
    const href = '/magento/';
    const requestUrl = `${href}rest/V1/orders?searchCriteria[filterGroups][][filters][][field]=state&searchCriteria[filterGroups][0][filters][0][value]=complete&searchCriteria[pageSize]=30&searchCriteria[sortOrders][0][field]=${sort}&searchCriteria[sortOrders][0][direction]=${order}&searchCriteria[currentPage]=${
      page + 1
    }`;

    const headers = {
      'Authorization': 'Bearer ' + this.tokenStorage.getTokenFromCookie()
    }

    return this._httpClient.get<MagentoOrders>(requestUrl, {headers: headers});
  }
}
