import { Component, EventEmitter, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FoodItemImage } from 'src/app/models/food-item-image';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  public files: NgxFileDropEntry[] = [];
  imageData: FileSystemFileEntry | undefined;
  image: File | undefined;
  pic: string = '';

  @Output() imageUploaded: EventEmitter<FoodItemImage> =
    new EventEmitter<FoodItemImage>();

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.imageData = droppedFile.fileEntry as FileSystemFileEntry;

        this.imageData.file((file: File) => {
          // Here you can access the real file

          // ADD FILE TO STRING CONVERSION
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e: any) => {
            let image = new Image();
            image.src = e.target.result;
            image.onload = (rs) => {
              this.pic = e.target.result;
              const fileName = file.name;
              let image: FoodItemImage = new FoodItemImage(
                0,
                file.name,
                this.pic
              );
              this.imageUploaded.emit(image);
            };
          };

          // console.log(droppedFile.relativePath, file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}
