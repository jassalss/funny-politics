import { Component } from "@angular/core";
import axios from "axios";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  urls = [];
  searchValue = "";
  ngOnInit() {
    this.getGifsData(this.updateArray, "trudeau");
    this.getGifsData(this.updateArray, "biden");
    this.getGifsData(this.updateArray, "trump");
  }
  updateArray = (data) => {
    this.urls.unshift(...data);
  };
  getGifsData(updateArray, name) {
    var api = "https://api.giphy.com/v1/gifs/search";
    axios
      .get(api, {
        params: {
          api_key: "uz7atrUhqkEfESjjGRJi3a5k7nlzlh0X",
          q: name,
          limit: 10
        }
      })
      .then((response) => {
        // handle success
        updateArray(
          response.data.data.map((e) => {
            return e.images.original.url;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.searchValue.length > 3) {
      this.getGifsData(this.updateArray, this.searchValue);
    }
  }
  handleInput(event: Event) {
    this.searchValue = event.target.value;
  }
}
