import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from '../user';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  frmgrp:FormGroup;
  name = new FormControl('',  [Validators.required, Validators.minLength(4)]);
  emailId = new FormControl('',[Validators.required, Validators.email]);
  subject = new FormControl('');
  file= new FormControl('', [Validators.required]);
  

  user: User = new User(); submitted = false;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;  files:any  =  [];  fileupload = {status: '', message: '', filePath: ''};
  fileName:string;error:string;
  filetoupload:string;
  selectedFiles: FileList;
  acronym:string;paperid:string; authorname:string;authorfile:string;filenamecheck=false;
  constructor(private userService: UserService,
    private router: Router ,private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe(event => {
      this.acronym = event.acronym;
      this.paperid = event.paperid;
      this.authorname=event.authorname;
      //this.authorfile=this.acronym+'-'+this.paperid+'.zip';
      this.authorfile='.zip';
      console.log(this.authorfile);
      console.log(this.authorname);
      console.log(this.acronym);
      console.log(this.paperid);
     });
  }
  selectFile(event:any) {
    const file = event.target.files.item(0);
    console.log(file.name);
    console.log(this.acronym+'-'+this.paperid+'.zip');
    this.filenamecheck=false;
    if(file.name === this.acronym+'-'+this.paperid+'.zip'){
        this.filenamecheck=true;
        console.log(this.filenamecheck);
    }
   
    if (file.type.match('.*')) { 
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }  
  onSubmit() {
    this.submitted = true;
    console.log(this.submitted);
    // this.onSomeAction(event);
      this.save();    
    
  }
  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }
  save() { 
    const fileUpload = this.fileUpload.nativeElement;
    for (let index = 0; index < fileUpload.files.length; index++)  
    {  
     const file = fileUpload.files[index];  
     this.filetoupload=file.name ;
      this.fileName = file.name +" is being uploaded"
     console.log(file.name +" is being uploaded");
     this.files.push({ data: file, inProgress: false, progress: 0});  
    }  
       this.uploadFiles(this.user);  

  }
  private uploadFiles(user:User) { 
    console.log(this.user);
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file,this.user);
      console.log('Fininshed!!!!!!!');
      
    }); 
  }
  uploadFile(file:any, user:any)  {    
    console.log('Inside uploadFile!!!!!!!');
    const formData = new FormData();  
    console.log(user);
    formData.append('file', file.data); 
    formData.append('user',JSON.stringify(user) );  
    console.log('Success!!!');
    file.inProgress = true;  
    console.log('test');
    this.userService.upload(formData).subscribe(
      rsp   => { 
        console.log('Success!!!!!!!');
          this.fileupload = rsp ;
           console.log('response message '+rsp);
           
          let resSTR = JSON.stringify(rsp);
          let resJSON = JSON.parse(resSTR);
        //  console.log(this.fileupload.message);
          if (this.fileupload.message=='100') {
            console.log("file uploaded to java application");
           
           
            setTimeout(function() {
              window.close()
          }, 60000);
          } 
          if(rsp=='File uploaded'){
            this.gotoPage();
          }
  },
      error => {
         this.error = error
         console.log('Error!!!!!!!');
      
      });
    
  }
  gotoPage() {
    this.router.navigate(['/success']);
  }
  gotoPagee() {
    this.router.navigate(['/success']);
  }
 
}
