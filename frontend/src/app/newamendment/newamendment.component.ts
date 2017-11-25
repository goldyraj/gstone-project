import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newamendment',
  templateUrl: './newamendment.component.html',
  styleUrls: ['./newamendment.component.css']
})
export class NewamendmentComponent implements OnInit {


  type:string;
   GSTIN=
  [
    'SELECT',
    'AGPTK234L61Z6',
    'AGPTK894K61Z6',
    'SJPTK234L61Z6',
    'AWRTK236S61Z6',
    'ATDTK237Z61Z6'
  ]

  place=[
    'SELECT',
'01-Jammu & Kashmir',
'02-Himachal Pradesh',
'03-Punjab',
'04-Chandigarh',
'05-Uttarakhand',
'06-Haryana',
'07-Delhi',
'08-Rajasthan',
'09-Uttar Pradesh',
'10-Bihar',
'11-Sikkim',
'12-Arunachal Pradesh',
'13-Nagaland',
'14-Manipur',
'15-Mizoram',
'16-Tripura',
'17-Meghalaya',
'18-Assam',
'19-West Bengal',
'20-Jharkhand',
'21-Odisha',
'22-Chhattisgarh',
'23-Madhya Pradesh',
'24-Gujarat',
'25-Daman & Diu',
'26-Dadra & Nagar Haveli',
'27-Maharashtra',
'29-Karnataka',
'30-Goa',
'31-Lakshdweep',
'32-Kerala',
'33-Tamil Nadu',
'34-Pondicherry',
'35-Andaman & Nicobar Islands',
'36-Telangana',
'37-Andhra Pradesh',
'97-Other Territory'
  ]
serice=[
    'SELECT',
    'GOODS',
    'SERVICES'
]
  unit=[
    'SELECT',
    'CAN-CANS',
'CBM-CUBIC',
'METERS',
'CCM-CUBIC',
'CENTIMETERS',
'CMS-CENTIMETERS',
'CTN-CARTONS',
'DOZ-DOZENS',
'DRM-DRUMS',
'GGK-GREAT',
'GROSS',
'GMS-GRAMMES',
'GRS-GROSS',
'GYD-GROSS',
'YARDS',
'KGS-KILOGRAMS',
'KLR-KILOLITRE',
'KME-KILOMETRE',
'MLT-MILILITRE',
'MTR-METERS',
'MTS-METRIC',
'TON',
'NOS-NUMBERS',
'PAC-PACKS',
'PCS-PIECES',
'PRS-PAIRS',
'QTL-QUINTAL',
'ROL-ROLLS',
'SET-SETS',
'SQF-SQUARE',
'FEET',
'SQM-SQUARE',
'METERS',
'SQY-SQUARE',
'YARDS',
'TBS-TABLETS',
'TGM-TEN',
'GROSS',
'THD-THOUSANDS',
'TON-TONNES',
'TUB-TUBES',
'UGS-US',
'GALLONS',
'UNT-UNITS',
'YDS-YARDS',
'OTH-OTHERS'
  ]

 rate=[
    'SELECT',
    '0%',
    '0.25%',
    '3%',
    '5%',
    '12%',
    '18%',
    '28%'
  ]

  
  constructor() { }

  ngOnInit() {
  }

}
