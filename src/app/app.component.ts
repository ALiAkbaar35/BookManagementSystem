import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Book {
  id: number | any;
  name: string;
  category: string;
  author: string;
  tags: string;
  status: number | any;
}

interface Issue {
  id: number | any;
  bookId: number | any;
  userName: string;
  issueDate: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  AddDialogOpen: boolean = false;
  IssueDialogOpen: boolean = false;
  statusFilter: string = '2';
  cond: any = '';
  bookList: Book[] = [];
  Books: Book[] = [];
  IssueList: Issue[] = [];
  Issues: Issue[] = [];
  newIssue: Issue = {
    id: '',
    bookId: '',
    userName: '',
    issueDate: '',
  };
  newBook: Book = {
    id: '',
    name: '',
    category: '',
    author: '',
    tags: '',
    status: '',
  };
  reset() {
    this.newBook = {
      id: '',
      name: '',
      category: '',
      author: '',
      tags: '',
      status: '',
    };
  }
  resetIssue() {
    this.newIssue = {
      id: '',
      bookId: '',
      userName: '',
      issueDate: '',
    };
  }
  generateId(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
  closeModal() {
    this.IssueDialogOpen = false;
    this.AddDialogOpen = false;
  }
  showModal() {
    this.closeModal();
    this.AddDialogOpen = true;
  }
  IssueShowModal() {
    this.closeModal();
    this.IssueDialogOpen = true;
  }
  addBook() {
    this.newBook.id = this.generateId();
    let cond = this.bookList.some((bo) => bo.id === this.newBook.id);
    let cond2 = this.bookList.some(
      (bo) => bo.name.toLowerCase() === this.newBook.name.toLowerCase()
    );
    if (cond) {
      alert('Id Already Exist');
    } else if (cond2) {
      alert('Name Already Exist');
    } else if (!this.newBook.name) {
      alert('Name cannot be empty');
    } else if (this.newBook.name.length > 10) {
      alert('Name length should be less than 10');
    } else if (!this.newBook.author) {
      alert('Author cannot be empty');
    } else if (this.newBook.author.length > 10) {
      alert('Author length should be less than 10');
    } else if (!this.newBook.category) {
      alert('Category cannot be empty');
    } else if (this.newBook.category.length > 10) {
      alert('Category length should be less than 10');
    } else if (!this.newBook.tags) {
      alert('Tags cannot be empty');
    } else if (this.newBook.tags.length > 10) {
      alert('Tags length should be less than 10');
    } else if (!this.newBook.status) {
      alert('Status cannot be empty');
    } else {
      this.bookList.push(this.newBook);
      this.Books = this.bookList;
      this.reset();
      this.AddDialogOpen = false;
    }
  }
  IssueBook() {
    this.newIssue.id = this.generateId();
    let cond = this.IssueList.some((bo) => bo.id === this.newIssue.id);
    let cond2 = this.IssueList.some(
      (bo) => bo.userName.toLowerCase() === this.newIssue.userName.toLowerCase()
    );
    if (cond) {
      alert('Id Already Exist');
    } else if (cond2) {
      alert('Name Already Exist');
    } else if (!this.newIssue.userName) {
      alert('Name cannot be empty');
    } else if (this.newIssue.userName.length > 10) {
      alert('Name length should be less than 10');
    } else {
      this.IssueList.push(this.newIssue);
      this.Issues = this.IssueList;
      const book = this.bookList.find(
        (book) => book.id == this.newIssue.bookId
      );
      if (book) {
        book.status = 0;
        console.log('Book issued successfully');
      } else {
        console.log('Book not found');
      }
      this.resetIssue();
      this.IssueDialogOpen = false;
    }
  }
  getName(id: number) {
    return this.bookList.find((book) => book.id == id)?.name;
  }
  filterBooks() {
    if (this.statusFilter === '2') {
      this.Books = this.bookList;
    } else {
      this.Books = this.bookList.filter(
        (book) => book.status == this.statusFilter
      );
    }
    return this.bookList;
  }
}
