// Tạo mảng danh sách nhân viên
let nhanvienList = [];
function createNhanvien() {
    let taikhoan = getElement("#tknv").value;
    let ten = getElement("#name").value;
    let email = getElement("#email").value;
    let matkhau = getElement("#password").value;
    let ngaylam = getElement("#datepicker").value;
    let luong = +getElement("#luongCB").value;
    let chucvu = getElement("#chucvu").value;
    let giolam = +getElement("#gioLam").value;
    // B1.1: kiểm tra input có hợp lệ không
    let isValid = validate();
    if(!isValid){
        return;
    }
    //    B2: khởi tạo object
    const nhanvien = new Nhanvien(taikhoan, ten, email, matkhau, ngaylam, luong, chucvu, giolam);
    // B3:
    nhanvienList.push(nhanvien);
    //   B4: hiển thị danh sách nhanvienList
    renderTable(nhanvienList);
    // B5:
    resetForm();

}
// Hàm xóa nhân viên theo tài khoản
function deleteNhanvien(nhanVienId){
   
    nhanvienList = nhanvienList.filter((nhanvien) => {
        return nhanvien.taikhoan !== nhanVienId;
    });
    renderTable(nhanvienList);
}
// *******
function selectNhanvien(nhanVienId){
    let selectedNhanvien = nhanvienList.find((nhanvien) => {
        return nhanvien.taikhoan === nhanVienId;
    });
    // B2: lấy thông tin
    getElement("#tknv").value = selectedNhanvien.taikhoan; 
    getElement("#name").value = selectedNhanvien.ten;
    getElement("#email").value = selectedNhanvien.email;
    getElement("#password").value = selectedNhanvien.matkhau;
    getElement("#datepicker").value = selectedNhanvien.ngaylam;
    getElement("#luongCB").value = selectedNhanvien.luong;
    getElement("#chucvu").value = selectedNhanvien.chucvu;
    getElement("#gioLam").value = selectedNhanvien.giolam;
    // ********
    getElement("#btnThemNV").disabled = true;
    getElement("#tknv").disabled = true;
} 
// HÀM CẬP NHẬT THÔNG TIN NHÂN VIÊN
function updateNhanvien(){
    let taikhoan = getElement("#tknv").value;
    let ten = getElement("#name").value;
    let email = getElement("#email").value;
    let matkhau = getElement("#password").value;
    let ngaylam = getElement("#datepicker").value;
    let luong = +getElement("#luongCB").value;
    let chucvu = getElement("#chucvu").value;
    let giolam = +getElement("#gioLam").value;
    //    B2: khởi tạo object
    const nhanvien = new Nhanvien(taikhoan, ten, email, matkhau, ngaylam, luong, chucvu, giolam);
    // B3: cập nhật thông tin mới của nhân viên
    let index = nhanvienList.findIndex((nhanvien) => {
        return nhanvien.taikhoan === taikhoan;
    });
    nhanvienList[index] = nhanvien;
    // B4: gọi hàm renderTable
    renderTable(nhanvienList);
    // B5: reset form
    resetForm();
}
// HÀM TÌM KIẾM NHÂN VIÊN THEO XẾP LOẠI
function searchNhanvien() {
    let search = getElement("#searchName").value;
    let newNhanvienLisit = nhanvienList.filter((nhanvien) => {
        let xepLoai = nhanvien.xepLoai().toLowerCase();
        search = search.toLowerCase();
        return xepLoai.indexOf(search) !== -1;
    });
    renderTable(newNhanvienLisit);
}
function renderTable(nhanvienList) {
    let html = "";
    for (let i = 0; i < nhanvienList.length; i++) {
        let nhanvien = nhanvienList[i];
        html += `
        <tr>
        <td>${nhanvien.taikhoan}</td>
        <td>${nhanvien.ten}</td>
        <td>${nhanvien.email}</td>
        <td>${nhanvien.ngaylam}</td>
        <td>${nhanvien.grank()}</td>
        <td>${nhanvien.tongLuong()}</td>
        <td>${nhanvien.xepLoai()}</td>
        <td> 
           <button class="btn btn-primary" onclick="selectNhanvien('${nhanvien.taikhoan}')">Chỉnh sửa</button>
           <button class="btn btn-danger" onclick="deleteNhanvien('${nhanvien.taikhoan}')">Xóa</button>
        </td>
        
        
        </tr>
        
        `;
    }
    getElement("#tableDanhSach").innerHTML = html;
    // console.log(html);
}
// HÀM XÓA NHÂN VIÊN
function resetForm() {
    getElement("#tknv").value = "";
    getElement("#name").value = "";
    getElement("#email").value = "";
    getElement("#password").value = "";
    getElement("#datepicker").value = "";
    getElement("#luongCB").value = "";
    getElement("#chucvu").value = "";
    getElement("#gioLam").value = "";

    getElement("#btnThemNV").disabled = false;
    getElement("#tknv").disabled = false;
}
function getElement(selector) {
    return document.querySelector(selector);
}
// ***************************
// validate thông tin input và update
function validate(){
    let isValid = true;
    // kiểm tra tài khoản
    let taikhoan = getElement("#tknv").value;
    if(!taikhoan.trim()){
        isValid = false;
        getElement("#tbTKNV").innerHTML = "tài khoản nhân viên không được để trống";
        getElement("#tbTKNV").style.display = "block";
    } else{
        getElement("#tbTKNV").innerHTML = "";
    }
    // kiểm tra tên
    let ten = getElement("#name").value;
    if(!ten.trim()){
        isValid = false;
        getElement("#tbTen").innerHTML = "họ tên nhân viên không được để trống";
        getElement("#tbTen").style.display = "block";
    } else{
        getElement("#tbTen").innerHTML = ""; 
    }
   
    // kiểm tra email
    let email = getElement("#email").value;
    if(!email.trim()){
        isValid = false;
        getElement("#tbEmail").innerHTML = "email nhân viên không được để trống";
        getElement("#tbEmail").style.display = "block";
    } else if(!/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
        isValid = false;
        getElement("#tbEmail").innerHTML = "email nhân viên không hợp lệ";
        getElement("#tbEmail").style.display = "block";
    } else{
        getElement("#tbEmail").innerHTML = "";
    }
    // kiểm tra password
    let password = getElement("#password").value;
    if(!password.trim()){
        isValid = false;
        getElement("#tbMatKhau").innerHTML = "mật khẩu nhân viên không được để trống";
        getElement("#tbMatKhau").style.display = "block";
    } else if(!/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})/.test(password)){
        isValid = false;
        getElement("#tbMatKhau").innerHTML = "mật khẩu nhân viên không  hợp lệ";
        getElement("#tbMatKhau").style.display = "block"; 
    } else {
        getElement("#tbMatKhau").innerHTML = "";
    }

    // kiểm tra ngày làm
    let ngaylam = getElement("#datepicker").value;
    if(!ngaylam.trim()){
        isValid = false;
        getElement("#tbNgay").innerHTML = "ngày làm nhân viên không được để trống";
        getElement("#tbNgay").style.display = "block";
    } else{
        getElement("#tbNgay").innerHTML = "";  
    }
     // kiểm tra lương
    let luong = getElement("#luongCB").value;
    if(!email.trim()){
        isValid = false;
        getElement("#tbLuongCB").innerHTML = "lương nhân viên không được để trống";
        getElement("#tbLuongCB").style.display = "block";
    } else{
        getElement("#tbLuongCB").innerHTML = "";
    }
    // kiểm tra giờ làm
    let giolam = getElement("#gioLam").value;
    if(!giolam.trim()){
        isValid = false;
        getElement("#tbGiolam").innerHTML = "giờ làm nhân viên không được để trống";
        getElement("#tbGiolam").style.display = "block";
    } else{
        getElement("#tbGiolam").innerHTML = "";
    }

    return isValid;
}