import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberAddRequest, MemberEditRequest, MemberPaymentRequest,JudgeCostRequest, AdvocateDonationRequest} from "../model/user.model";

@Injectable()
export class UserService {  
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080';

  login(loginData: any) {
    return this.http.post(this.baseUrl+'/auth/login', loginData);
  }

  getMemberList(){
    return this.http.get(this.baseUrl + '/member/getMembers');
  }

  getMemberByRollNo(rollNo: string){
    return this.http.get(this.baseUrl + '/member/getMemberById?rollNo='+rollNo);
  }

  getMember(requestParam: string){
    return this.http.get(this.baseUrl + '/member/getMembersByFlag?'+requestParam);
  }

  addMember(memberAddRequest: MemberAddRequest){    
    return this.http.post(this.baseUrl + '/member/addMember', memberAddRequest);
  } 

  editMember(memberEditRequest: MemberEditRequest){
    return this.http.put(this.baseUrl + '/member/editMember', memberEditRequest);
  }

  memberPayment(memberPaymentRequest: MemberPaymentRequest){
    return this.http.post(this.baseUrl + '/member/memberPayment', memberPaymentRequest);
  }

  getMemberPayment(requestParam: string){
    return this.http.get(this.baseUrl + '/member/getMemberPayment?'+requestParam);
  }

  addJudgeCost(judgeCostRequest: JudgeCostRequest){
    return this.http.post(this.baseUrl + '/member/addCost', judgeCostRequest);
  }

  getJudgeCost(){
    return this.http.get(this.baseUrl + '/member/getJudgeCost');
  }

  addAdvDonation(advocateDonationRequest: AdvocateDonationRequest){
    return this.http.post(this.baseUrl + '/member/addAdvDonation', advocateDonationRequest);
  }

  getAdvDonation(){
    return this.http.get(this.baseUrl + '/member/getAdvDonation');
  }

  checkLockerAvailability(lockerId: string, fromDate: string, toDate: string){
    return this.http.get(this.baseUrl + '/member/checkLockerAvailablity?lockerNo='+lockerId+'&fromDate='+fromDate+'&toDate='+toDate);
  }

  surrenderLocker(billNo: string){
    var reqParam = {
      'billNo' : billNo
    }
    return this.http.put(this.baseUrl + '/member/surrenderLocker', reqParam);
  }


}
