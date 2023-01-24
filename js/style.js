function Nhanvien(taikhoan, ten, email, matkhau, ngaylam, luong, chucvu, giolam){
    this.taikhoan = taikhoan;
    this.ten = ten;
    this.email = email;
    this.matkhau = matkhau;
    this.ngaylam = ngaylam;
    this.luong = luong;
    this.chucvu = chucvu;
    this.giolam = giolam;
   

   


}
Nhanvien.prototype.grank = function(){
    if(this.chucvu === "sep"){
        return "Sếp";
    } else if(this.chucvu === "truongphong"){
        return "Trưởng phòng";
    } else if(this.chucvu === "nhanvien") {
        return "Nhân viên";
    }
};
Nhanvien.prototype.tongLuong = function(){
    if(this.chucvu === "sep"){
        return this.luong * 3;
    } else if(this.chucvu === "truongphong"){
        return this.luong * 2;
    } else if(this.chucvu === "nhanvien") {
        return this.luong;
    }
};
Nhanvien.prototype.xepLoai = function(){
    if(this.giolam >= 192){
        return "Xuất sắc";
    }
    if(this.giolam >= 176){
        return "Giỏi";
    }
    if(this.giolam >= 160){
        return "Khá";
    }
    return "Trung bình";
    
};
