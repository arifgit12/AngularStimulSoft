import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { AppService } from '../app.service';
declare var Stimulsoft: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false);
  //report = new Stimulsoft.Report.StiReport();
  categories: any = [];
  city:string='Riyadh';
  company:string='';

  constructor(private service:AppService) { }

  ngOnInit(): void {
    console.log('Loading Viewer view');
    //Stimulsoft.Stimulsoft.Base.StiLicense.loadFromFile('path/to/stimulsoft.license.key'); // Load your license key
    
    //this.report.loadFile('../../assets/reports/SimpleList.mrt'); // Load your Stimulsoft report file

    console.log('Generating JSON data');   

    this.service.getCategories().subscribe(  
      (response) => {
        this.categories = response;       
        if(this.categories) {
          this.renderCategoriesHtml(this.categories);
        }
      }
    )
    
  }

  onSubmit() {
    if(this.company && this.company.length>0) {
      //console.log("Search City: " + this.city);
      let searchCities = this.categories.Customers.filter((customer: { CompanyName: string; }) => customer.CompanyName === this.company);
      //console.log(searchCities);
      if(searchCities && searchCities.length>0)
      {
        const buildSearchCustomers = {
          "Customers" : searchCities
        };
        this.renderCategoriesHtml(buildSearchCustomers);
      }
    }
  }

  renderCategoriesHtml(customers: any){
    const report = new Stimulsoft.Report.StiReport();
    report.loadFile('../../assets/reports/SimpleList.mrt');

    console.log(customers);
    var dataSet = new Stimulsoft.System.Data.DataSet("Demo");
    dataSet.readJson(customers);

    report.dictionary.databases.clear();
    report.regData("Demo", "Demo", dataSet);

    console.log('Assigning report to the viewer, the report will be built automatically after rendering the viewer');
    this.viewer.report = report;

    // Render the report to an HTML element
    console.log('Rendering the viewer to selected element');
    this.viewer.renderHtml('report-container');

    console.log('Loading completed successfully!');
  }
}

