import { Component, OnInit } from '@angular/core';
import { Societe } from '../classes/societe';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocieteService } from '../services/societe.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class TableListComponent implements OnInit {
  h:Societe;
  list = {} as any ;
  nom : string;
  logo : string;
  symbole:string;
  id: number;
  ajoutForm: FormGroup;
  ReactiveFormModul
  submitted = false;
  exist: boolean;
  downloadURL: Observable<string>;
  imagePreview: string | ArrayBuffer;
  fb = '';
  societe:Societe;
  societes:Societe[];
  path:string;
  filePath:String;
  nomSoci: string;
  listSociete : Societe[]=[];
  soci = {} as any ;
  users = {} as any ;
  constructor(private societeService:SocieteService ,private formBuilder: FormBuilder,  
      private storage: AngularFireStorage , private httpClient: HttpClient,
      config: NgbModalConfig, private modalService: NgbModal ) { }

  ngOnInit() {
    this.societeService .getSocietes().subscribe((res) => {
      this.list = res;
      this.listSociete= this.list;
      console.log("societe",this.list);
      this.societe=new Societe();
    });
    this.h=new Societe();

    this.ajoutForm = this.formBuilder.group({
      nom: ['', Validators.required],
      logo: ['', Validators.required],
     
      symbol: ['', Validators.required],
      
  })
      
  }
 
  get f() { return this.ajoutForm.controls; }
  
  update() {
    console.log(this.filePath)
    this.storage.upload('/images'+this.filePath, this.filePath);
    console.log("idP",this.h.idd)
    this.h.symbole=this.symbole;
    this.h.nom = this.nom; 
    this.h.logo = this.fb;
    this.societeService.updateSociete(this.h).subscribe((res) => {
      alert("ajouter avec succés");
   window.location.replace("table-list")
    });
  }

  onEdit(emp, content) {
    this.modalService.open(content);
    console.log(emp);
    this.h.idd=emp.idd;
    this.nom = emp.nom; 
    this.symbole= emp.symbole;
    this.fb = emp.logo;
    this.symbole = emp.symble;
   

  }


  onDelete(_id: string) {
    if (confirm('Voulez-vous vraiment supprimer cet enregistrement ?') === true) {
      this.societeService.deleteSociete(_id).subscribe((res) => {
        this.ngOnInit();
      });
    }
  }

 
  
  onFileSelected(event) {
    var n = Date.now();
    this.filePath = event.target.files[0]
    const file = event.target.files[0];
    const filePath = `Produits/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Produits/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }
    
    

  open(content) {
    this.modalService.open(content);
    
  
}
 

//recherche societes
  searche(){
    if (this.nomSoci != ""){
      this.list = this.list.filter(res=>{
        return res.nom.toLocaleLowerCase().match(this.nomSoci.toLocaleLowerCase());
      });
    }else if(this.nomSoci==""){
      this.ngOnInit();
    }

  }





}


