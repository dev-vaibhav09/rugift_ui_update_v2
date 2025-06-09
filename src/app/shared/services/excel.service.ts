// import {Injectable} from '@angular/core';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
//
// @Injectable({
//     providedIn: 'root'
// })
// export class ExcelService {
//     EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//     EXCEL_EXTENSION = '.xlsx';
//
//     constructor() {
//     }
//
//     public exportAsExcelFile(data: any[], fileName: string, sortByField?: string, excludedFields?: string[], columnOrder?: string[]): void {
//         let filteredData = [...data];
//
//         if (sortByField) {
//             filteredData.sort((a, b) => (a[sortByField] > b[sortByField] ? 1 : -1));
//         }
//
//         if (excludedFields && excludedFields.length > 0) {
//             filteredData = filteredData.map((item) => {
//                 const filteredItem = {...item};
//                 excludedFields.forEach((field) => {
//                     delete filteredItem[field];
//                 });
//                 return filteredItem;
//             });
//         }
//
//         const orderedData = filteredData.map((item) => {
//             let orderedItem = {};
//             if (columnOrder && columnOrder.length > 0) {
//                 columnOrder.forEach((field) => {
//                     orderedItem[field] = item[field];
//                 });
//             } else {
//                 orderedItem = item;
//             }
//             return orderedItem;
//         });
//
//         const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(orderedData);
//         const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
//         const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
//         this.saveAsExcelFile(excelBuffer, fileName);
//     }
//
//     private saveAsExcelFile(buffer: any, fileName: string): void {
//         const data: Blob = new Blob([buffer], {type: this.EXCEL_TYPE});
//         FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
//     }
// }


import { Injectable } from '@angular/core';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private readonly EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private readonly EXCEL_EXTENSION = '.xlsx';

  constructor() {}

  public exportAsExcelFile(
    data: any[],
    fileName: string,
    sortByField?: string,
    excludedFields?: string[],
    columnOrder?: string[]
  ): void {
    // Clone and process the data
    let processedData = this.processData(data, sortByField, excludedFields, columnOrder);

    // Create a worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(processedData);

    // Create a workbook
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

    // Generate Excel buffer
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save the file
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  /**
   * Processes the data with sorting, exclusion, and column ordering.
   */
  private processData(
    data: any[],
    sortByField?: string,
    excludedFields?: string[],
    columnOrder?: string[]
  ): any[] {
    let filteredData = [...data];

    // Sort by field if provided
    if (sortByField) {
      filteredData.sort((a, b) => (a[sortByField] > b[sortByField] ? 1 : -1));
    }

    // Exclude fields
    if (excludedFields?.length) {
      filteredData = filteredData.map(item => {
        const filteredItem = { ...item };
        excludedFields.forEach(field => delete filteredItem[field]);
        return filteredItem;
      });
    }

    // Reorder columns if a custom order is provided
    if (columnOrder?.length) {
      filteredData = filteredData.map(item => {
        const orderedItem: any = {};
        columnOrder.forEach(field => (orderedItem[field] = item[field]));
        return orderedItem;
      });
    }

    return filteredData;
  }

  /**
   * Saves the processed buffer as an Excel file.
   */
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${this.EXCEL_EXTENSION}`);
  }
}
