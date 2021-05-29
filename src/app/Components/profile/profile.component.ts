import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import jwt_decode from "jwt-decode";
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  AllNotes:any;
  token:any ;
  decoded:any;
  Note_id:any;
  User_id:any;
  isLoad = false;
  isUpdating = false;
  isAdding = false ;
  isDeleting = false;
  noNotes = true;
  errorMessage = "";
  constructor(private _Router:Router,private _notesService:NotesService) { 
     try {
      this.token = localStorage.getItem('TOKEN');
      this.User_id = localStorage.getItem('id');
      this.decoded = jwt_decode(this.token);
          } catch (error) {
          localStorage.clear();
            this._Router.navigate(['/signin']);

        }
    this.getAllNotes();

    
    if(!localStorage.getItem('TOKEN'))
    {
      this._Router.navigate(['/signin']);

    }

  }
  addNote = new FormGroup({
    title:new FormControl('',Validators.required),
    desc :new FormControl('',Validators.required)

  });
  updateNote = new FormGroup({
    title:new FormControl('',Validators.required),
    desc :new FormControl('',Validators.required)
  });

  getAllNotes()
  {
   
    let data =
    {
        token:this.token,
        userID:this.decoded._id
    }
    this._notesService.getAllNotes(data).subscribe(response =>
      {
        if (response.message =='success') {
          this.isLoad = true;
          this.noNotes= false;
        this.AllNotes = response.Notes;
        }
         else {
           this.errorMessage = response.message;
          this.noNotes= true;
          this.isLoad = true;

          
          
        }
      }
    )
  }
  addData()
  {
    let data=
    {
      title:this.addNote.value.title,
      desc:this.addNote.value.desc,
      citizenID:this.decoded._id,
      token: this.token
    }
    this.isLoad = false;
    this.isAdding = true;
    this._notesService.addNotes(data).subscribe(response =>
      {
        if(response.message == "success")
        {
          $('#addNote').modal('hide');
          this.isLoad = true ;
          this.isAdding = false;
          this.getAllNotes();
          this.addNote.reset();
        }
       
      });
   
  }

  /************************************************** Delete Note  **************************************************/ 
  getID(id:any)
  {
    this.Note_id = id;
    console.log(id);
  }
  deleteNote()
  {
    let data =
    {
        NoteID:this.Note_id,
        token:this.token 
    }
    this.isLoad = false;
    this.isDeleting = true;
    this._notesService.deleteNote(data).subscribe(response =>
    {
        if(response.message == "deleted")
        { 
          $('#deleteNote').modal('hide');
          this.isLoad = true ;
          this.isDeleting = false;
          this.getAllNotes();
        }
      })
    }
  /************************************************** Update Note  **************************************************/

    setValue()
    {
      for (let i = 0; i < this.AllNotes.length; i++) {
        if (this.AllNotes[i]._id==this.Note_id) {
          this.updateNote.controls.title.setValue(this.AllNotes[i].title);
          this.updateNote.controls.desc.setValue(this.AllNotes[i].desc);
        }
       
        
      }
    }
    editNote()
    {
      let data=
    {
      token: this.token,
      title:this.updateNote.value.title,
      desc:this.updateNote.value.desc,
      NoteID:this.Note_id
      
    }
    this.isUpdating = true;
    this.isLoad = false;
    this._notesService.updateNote(data).subscribe(response =>
      {
        if(response.message == "updated")
        {
          this.isUpdating = false;
          $('#updateNote').modal('hide');
          this.getAllNotes();
          this.isLoad = true ;

        }
       
      });
    }

  ngOnInit(): void {
  }

}
