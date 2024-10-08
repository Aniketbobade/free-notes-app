import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Route, Router } from '@angular/router'
import { Observable, map, retry } from 'rxjs'
import { ApiService } from 'src/app/common-service/api.service'
import { LocalStorageService } from 'src/app/common-service/local-storage.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  getSubject: any = []
  fields: any = []
  documents: any = []
  getField: FormGroup
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.getField = this.formBuilder.group({
      id: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.apiService.get('/get-fields').subscribe((res: any) => {
      console.log(res)
      this.fields = res
    })
  }

  searchSubject() {
    if (this.getSubject.length > 0) {
      this.getSubject = [] // Clear the array if it's not empty
    }

    const id: string = this.getField.value.id // Access the value of the 'id' field
    this.apiService.get(`/get-subjects?fieldId=${id}`).subscribe(
      (res: any) => {
        this.getSubject = res.subjects // Assign the subjects directly
      },
      (error: any) => {
        // Error handling logic
        console.error('An error occurred:', error.message)
      }
    )
  }
  loadDocuments(id: string) {
    console.log(id)
    this.apiService.get(`/subject-document/${id}`).subscribe((res: any) => {
      console.log(res)
      this.documents = res.result
    })
  }

  navigateToOtherPage(documentId: string) {
    this.router.navigate(['/document-details'], {
      queryParams: { documentId },
    })
  }

  getRating(documentId: string) {}
}
