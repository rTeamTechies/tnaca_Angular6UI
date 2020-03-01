export class MemberAddRequest {
	rollNo: number;
	name: string;
	mobileNumber: string;
	fatherName: string;
	email: string;
	bloodGroup: string;
	homeAddress:string;
	dob:Date;
	officeAddress:string;
	advocateName: string;
	advocateHomeAddress: string;
	advocateOfficeAddress: string;
	advocateMobileNumber:string;
	advocateEmail :string; 
	activeFlag : number;
	membershipFlag : number
}

export class MemberEditRequest {
	memberId: number;
    rollNo: number;
	name: string;
	mobileNumber: string;
	fatherName: string;
	email: string;
	bloodGroup: string;
	homeAddress:string;
	dob: Date;
	officeAddress:string;
	advocateName: string;
	advocateHomeAddress: string;
	advocateOfficeAddress: string;
	advocateMobileNumber: string;
	advocateEmail : string; 
	activeFlag : number;
	membershipFlag : number
}

export class MemberPaymentRequest{
	rollNo : number;
	fromDate : Date;
	toDate :Date;
	amount: number;
	lockerLocation : string;
	lockerId : number;
	membershipflag :number;
	paymentType :string
}

export class JudgeCostRequest {
		billNo: string;
		judgeId: number;
		judgeName: string;
		caseNo: string;
		amount: string;
		paymentType: number;
		billDate: Date
}

export class AdvocateDonationRequest {
	billNo: string;
	advRollNo: number;
	advName: string;
	amount: string;
	paymentType: number;
	billDate: Date
}