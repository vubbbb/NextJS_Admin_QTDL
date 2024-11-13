const PBcolumns = [
  { name: "Mã phòng ban", uid: "PB_Ma" },
  { name: "Tên phòng ban", uid: "PB_TenPhongBan" },
  { name: "Văn phòng", uid: "PB_VanPhong" },
  { name: "Trưởng phòng", uid: "TruongPhong_TenNV" },
  { name: "Mã trưởng phòng", uid: "PB_MaTruongPhong" },
  { name: "Quản lí", uid: "actions" },
];

const NVcolumns = [
  { name: "Mã nhân viên", uid: "NV_Ma" },
  { name: "Họ và tên", uid: "NV_TenNV" },
  // { name: "Ngày sinh", uid: "NV_NgaySinh" },
  { name: "Địa chỉ", uid: "NV_DiaChi" },
  { name: "Số điện thoại", uid: "NV_SDT" },
  // { name: "Mật khẩu", uid: "NV_MatKhau" },
  { name: "Quản lí", uid: "actions" },
];

const ViewNVcolumns = [
  { name: "Mã nhân viên", uid: "NV_Ma" },
  { name: "Họ và tên", uid: "NV_TenNV" },
  { name: "Ngày sinh", uid: "NV_NgaySinh" },
  { name: "Địa chỉ", uid: "NV_DiaChi" },
  { name: "Số điện thoại", uid: "NV_SDT" },
  { name: "Mật khẩu", uid: "NV_MatKhau" },
  { name: "Mức độ tài khoản", uid: "NV_Role" },
  { name: "Nhân viên kiểm duyệt", uid: "NV_KiemDuyet" },
  { name: "Quản lí", uid: "actions" },
];

const AddNVcolumns = [
  // { name: "Mã nhân viên", uid: "NV_Ma" },
  { name: "Họ và tên", uid: "NV_TenNV" },
  { name: "Ngày sinh", uid: "NV_NgaySinh" },
  { name: "Địa chỉ", uid: "NV_DiaChi" },
  { name: "Số điện thoại", uid: "NV_SDT" },
  { name: "Mật khẩu", uid: "NV_MatKhau" },
  { name: "Quản lí", uid: "actions" },
];

const EditNVcolumns = [
  { name: "Họ và tên", uid: "NV_TenNV" },
  { name: "Ngày sinh", uid: "NV_NgaySinh" },
  { name: "Địa chỉ", uid: "NV_DiaChi" },
  { name: "Số điện thoại", uid: "NV_SDT" },
  { name: "Mật khẩu", uid: "NV_MatKhau" },
  { name: "Quản lí", uid: "actions" },
];

const CVcolumns = [
  { name: "Mã chức vụ", uid: "CV_Ma" },
  { name: "Tên chức vụ", uid: "CV_TenCV" },
  { name: "Hệ số lương", uid: "CV_HSL" },
  { name: "Quản lí", uid: "actions" },
];

const EditCVcolumns = [
  { name: "Tên chức vụ", uid: "CV_TenCV" },
  { name: "Hệ số lương", uid: "CV_HSL" },
  { name: "Quản lí", uid: "actions" },
];

const CTcolumns = [
  { name: "Tên nhân viên", uid: "NV_TenNV" },
  { name: "Tên phòng ban", uid: "PB_TenPhongBan" },
  { name: "Tên chức vụ", uid: "CV_TenCV" },
  { name: "Quản lí", uid: "actions" },
];

const ViewCTcolumns = [
  { name: "Mã nhân viên", uid: "NV_Ma" },
  { name: "Số điện thoại", uid: "NV_SDT" },
  { name: "Địa chỉ của nhân viên", uid: "NV_DiaChi" },
  { name: "Mức độ tài khoản", uid: "NV_Role" },
  { name: "Mã phòng ban", uid: "PB_Ma" },
  { name: "Tên phòng ban", uid: "PB_TenPhongBan" },
  { name: "Văn phòng", uid: "PB_VanPhong" },
  { name: "Mã chức vụ", uid: "CV_Ma" },
  { name: "Tên chức vụ", uid: "CV_TenCV" },
  { name: "Ngày bắt đầu công tác", uid: "CT_BatDau" },
  { name: "Ngày kết thúc công tác", uid: "CT_KetThuc" },
  { name: "Quản lí", uid: "actions" },
];

const Luongcolumns = [
  { name: "Mã nhân viên", uid: "NV_Ma" },
  { name: "Nghỉ", uid: "NN_Ma" },
  { name: "Ngày bắt đầu", uid: "L_ThangNam" },
  { name: "Số buổi làm", uid: "L_SoBuoiLam" },
  { name: "Lương thực lãnh", uid: "L_LuongThucLanh" },
  { name: "Quản lí", uid: "actions" },
];

const NPcolumns = [
  { name: "Mã nhân viên", uid: "NV_Ma" },
  { name: "Mã đơn xin nghỉ phép", uid: "NN_Ma" },
  { name: "Ngày nghỉ", uid: "NN_NgayNghi" },
  { name: "Ghi chú", uid: "NN_GhiChu" },
  { name: "Trạng thái duyệt", uid: "NN_KiemDuyet" },
  { name: "Quản lí", uid: "actions" },
  
];

const DMluongcolumns = [
  { name: "Mã nhân viên", uid: "NV_Ma" },
  { name: "Lương cơ bản", uid: "LUONG_LuongCoBan" },
  { name: "Phụ cấp", uid: "LUONG_PhuCap" },
  { name: "Khấu trừ thuế", uid: "LUONG_KhauTruThue" },
  { name: "Quản lí", uid: "actions" },
];

const EditDMluongcolumns = [
  { name: "Mã nhân viên", uid: "NV_Ma" },
  { name: "Lương cơ bản", uid: "LUONG_LuongCoBan" },
  { name: "Phụ cấp", uid: "LUONG_PhuCap" },
  { name: "Khấu trừ thuế", uid: "LUONG_KhauTruThue" },
  { name: "Ngày bắt đầu", uid: "LUONG_BatDau" },
  { name: "Ngày kết thúc", uid: "LUONG_KetThuc" },
  { name: "Quản lí", uid: "actions" },
];

const ViewDMluongcolumns = [
  { name: "Mã nhân viên", uid: "NV_Ma" },
  { name: "Lương cơ bản", uid: "LUONG_LuongCoBan" },
  { name: "Phụ cấp", uid: "LUONG_PhuCap" },
  { name: "Khấu trừ thuế", uid: "LUONG_KhauTruThue" },
  { name: "Ngày bắt đầu", uid: "LUONG_BatDau" },
  { name: "Ngày kết thúc", uid: "LUONG_KetThuc" },
  { name: "Quản lí", uid: "actions" },
];

export {
  PBcolumns,
  NVcolumns,
  CVcolumns,
  CTcolumns,
  Luongcolumns,
  NPcolumns,
  DMluongcolumns,
  ViewCTcolumns,
  ViewNVcolumns,
  AddNVcolumns,
  EditNVcolumns,
  EditCVcolumns,
  EditDMluongcolumns,
  ViewDMluongcolumns,
};
