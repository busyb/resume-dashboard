import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {FileServiceService, MLResult} from '../file-load/file-service.service';
// import {concatMap} from 'rxjs/operators';
// import {concatMap} from 'rxjs/operators';
// import {Router} from '@angular/router';


@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {

  // private successMessage = 'File(s) have been submitted successfully.'

    public map: any = {lat: 51.678418, lng: 7.809007};
    public chart1Type = 'bar';
    public chart2Type = 'pie';
    public chart3Type = 'line';
    public chart4Type = 'radar';
    public chart5Type = 'doughnut';


    public chartType = 'line';
    public positions: Position[] = [
        {value: 'F', viewValue: 'FrontEnd Engineer'},
        {value: 'B', viewValue: 'BackEnd Engineer'}
    ];

    public chartDatasets: Result[] = [
        {fileName: 'fileName', fileDownloadUri: '#1', fileType: '', size: 4, outcome: ""}
    ];

    public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    public chartColors: Array<any> = [];

    public dateOptionsSelect: any[];
    public bulkOptionsSelect: any[];
    public showOnlyOptionsSelect: any[];
    public filterOptionsSelect: any[];

    public chartOptions: any = {
        responsive: true,
        legend: {
            labels: {
                fontColor: '#5b5f62',
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: '#5b5f62',
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: '#5b5f62',
                }
            }]
        }
    };

    selected = 'option2';

    responseValues: Result[] = [
        {fileName: 'fileName', fileDownloadUri: '#1', fileType: '', size: 4, outcome: ''}
    ];
    stats: MLResult[];

    showResults = false;
    timestamp: string;
    submitEvent: Event;
    titleText = 'Dashboard';

    constructor(private http: HttpClient, private router: Router, private service: FileServiceService) {

    }

    ngOnInit() {
    }

    flipBoolean() {
        this.showResults = !this.showResults;
        this.titleText = 'Select your the Stars!';
    }

    downloadResume(url: string) {
        const options = new HttpHeaders();
        options.append('Content-Type', 'multipart/form-data');
        options.append('Accept', 'application/json');

        const httpOptions = {
            headers: options
        };
        this.http.post<Result[]>(url, httpOptions).subscribe(() => {});
    }

    fileChange(event: any) {
      this.timestamp = Date.now().toString();
      const key = '?key=' + this.timestamp + ',' + this.selected;
      console.log(this.router);

        const fileList: FileList = event.target.files;
        let counter = 0;
        if (fileList.length > 0) {
          let url = '';
          const formData: FormData = new FormData();
          Array.from(fileList).forEach(item => {
            counter++;
            const file: File = item;
            formData.append('file', file, file.name);
          });

          if (counter > 1) {
            url = 'http://localhost:8080/uploadMultipleFiles';
          } else {
            url = 'http://localhost:8080/uploadFile';
          }

            // this.service.uploadFile(url, key, formData)
            // // @ts-ignore
            //     .subscribe(rep => {
            //         this.responseValues = rep;
            //         this.flipBoolean();
            //     });


            this.service.uploadFile(url, key, formData)
            // @ts-ignore
              .subscribe(res => {
                  this.responseValues = res;
                  this.service.getResults(this.timestamp).subscribe(resp => {
                      // @ts-ignore
                      this.stats = resp.result;
                      this.flipBoolean();
                      this.appendResults();
                  });
              });
        }
    }

    submit($event: Event) {
       this.submitEvent = $event;
    }

    private appendResults() {
        const map = new Map<string, Result>();
        this.responseValues.forEach(item => map.set(item.fileName, item));

        this.stats.forEach(stat => {
            // @ts-ignore
            map.get(stat.name).outcome = stat.outcome;
        });
    }

    getColor(outcome: string) {
        return outcome === 'NO' ? 'red accent-2' : 'success-color-dark accent-2';
    }

    getIcon(outcome: string) {
        return outcome === 'NO' ? 'dizzy' : 'smile';
    }
}

export interface Position {
    value: string;
    viewValue: string;
}


export interface Result {
    fileName: string;
    fileDownloadUri: string;
    fileType: string;
    size: number;
    outcome: string;
}


