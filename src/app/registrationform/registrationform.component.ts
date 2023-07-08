import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent implements OnInit {


  customerName!:string ;
  checkInDate!: string;
  totalNoOfDays!: number;
  totalNoOfPersons!:number;
  amenityAC: boolean = false;
  amenityLocker: boolean = false;
  roomtype!: string;
  advanceAmount!: number;

  roomRate!: number;
  amenitiesCost!: number;
  totalAmenitiesCost!: number;

  storedFormList: any[] = [];
 
  ngOnInit(){
    const storedFormListString = localStorage.getItem('formList');
    if (storedFormListString){
      this.storedFormList = JSON.parse(storedFormListString);
    }
  }

  onSubmit(){
    // validate from inputs
    if (!this.customerName || !this.checkInDate || !this.totalNoOfDays || !this.totalNoOfPersons){
      alert('please fall in all mandatory fields.');
    }

    //calculate room rate based on room type
    if (this.roomtype === 'Delux Room') {
      this.roomRate = 2500;
    } else if (this.roomtype === 'Suite Room') {
      this.roomRate = 4000;
    }
    this.amenitiesCost = 0;
    if (this.amenityAC) {
      this.amenitiesCost += 1000;
    }
    if (this.amenityLocker) {
      this.amenitiesCost +=300;
    }

    //calculate total cost
    const totalRoomCost = this.roomRate * this.totalNoOfDays;
    const totalAmenitiesCost = this.amenitiesCost * this.totalNoOfDays;
    let totalCost = totalRoomCost + totalAmenitiesCost;

    //calculate additional person cost
    if(this.totalNoOfPersons > 2) {
      const additionalPerson = this.totalNoOfPersons - 2;
      const additionalPersonCost = additionalPerson * 1000 * this.totalNoOfDays;
      totalCost += additionalPersonCost;
    }

    //calculate balance amount
    const balance = totalCost - this.advanceAmount;

    //store form date in local storage
    const formDate = {
      customerName: this.customerName,
      checkInDate: this.checkInDate,
      totalNoOfDays: this.totalNoOfDays,
      totalNoOfPersons: this.totalNoOfPersons,
      roomtype:this.roomtype,
      amenityAC:this.amenityAC,
      amenityLocker:this.amenityLocker,
      advanceAmount:this.advanceAmount,
      roomRate: this.roomRate,
      amenitiesCost:this.totalAmenitiesCost,
      totalCost:totalCost,
      balance:balance,
    };

    this.storedFormList.push(formDate)

    //clear form fields after submission
    this.customerName = '';
    this.checkInDate = '';
    this.totalNoOfDays = 0;
    this.amenityAC = false;
    this.amenityLocker = false;
    this.totalNoOfPersons = 0;
    this.roomtype = '';
    this.advanceAmount=0;

    // Get existing form data from local storage (if any)
    const storedFormDataString = localStorage.getItem('formList');
    let storedFormData = [];
    if (storedFormDataString) {
      // console.log(formData)
      storedFormData = JSON.parse(storedFormDataString);
    }
    

    // Add current form data to the list
    storedFormData.push(formDate);

    // Save the updated form data list in local storage
    localStorage.setItem('formList', JSON.stringify(storedFormData));
  }

  removeStoredData(index: number) {
    // this.storedFormList.splice(index, 1);
    this.storedFormList.splice(index, 1);
    localStorage.setItem('formList', JSON.stringify(this.storedFormList));
    }

}

