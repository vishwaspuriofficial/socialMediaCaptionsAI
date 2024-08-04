// import { Component, OnInit } from '@angular/core';
// import { MyService } from './connection.service';
// import { RouterOutlet } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, FormsModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title: any;
//   captions: string = "";
//   image: any;
//   imageUrl: string = ''

//   constructor(private myService: MyService) { }

//   ngOnInit() { }

//   onSubmit() {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       this.imageUrl = e.target?.result as string;
//     };
//     reader.readAsDataURL(this.image);
//     // this.myService.fileName(this.image).subscribe(result => {
//     //   this.captions = result;
//     // });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MyService } from './connection.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: any;
  captions: string = "";
  image: File | null = null; // Declare image as File or null
  imageUrl: string = '';

  constructor(private myService: MyService) { }

  ngOnInit() { }

  onFileSelected(event: any) {
    this.image = event.target.files[0]; // Get the selected file
  }


  onSubmit() {
    if (this.image) {
      this.myService.getCaptions(this.image).subscribe(result => {
        console.log(result);
        this.captions = result;
      });
    } else {
      console.error("Please select an image file.");
    }
  }
  // onSubmit() {
  //   if (this.image) { // Check if a file is selected
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.imageUrl = e.target?.result as string;
  //       console.log(this.imageUrl);
  //     };
  //     reader.readAsDataURL(this.image);
  //     this.myService.fileName(this.imageUrl).subscribe(result => {
  //       this.captions = result;
  //     });
  //   } else {
  //     // Handle the case where no file is selected
  //     console.error("Please select an image file.");
  //   }
  // }
}