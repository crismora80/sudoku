import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TableMediatorService {
    updateCell$ = new Subject<string>();
}