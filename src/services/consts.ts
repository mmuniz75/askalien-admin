import { HttpHeaders } from '@angular/common/http';

export const HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Basic ' +  btoa('test:111') })
 };