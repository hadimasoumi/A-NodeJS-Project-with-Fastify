import { Component, Input, OnInit } from "@angular/core";
import { ChartData, ChartOptions } from "chart.js";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements OnInit {
  @Input() data: Array<number>;
  @Input() labels: Array<string>;
  @Input() tiny = true;
  tinyLables = [];
  chartData: ChartData<"line">;
  chartOptions: ChartOptions;
  constructor() {}

  ngOnInit(): void {
    if (this.tiny) {
      for (const item of this.data) {
        this.tinyLables.push("");
      }
    }
    // console.log("this.labels >> ", this.labels);
    // console.log("data >> ", this.data);
    this.chartData = {
      labels: this.tiny ? [...this.tinyLables] : this.labels,
      datasets: [{ label: "Prices", data: this.data, tension: 0 }],
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: false,
        },
        tooltip: {},
      },
    };
  }

  chartHovered(event) {}
  chartClicked(event) {}
}
