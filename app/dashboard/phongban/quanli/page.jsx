import QLModal from "@/app/ui/dashboard/phongban/quanliphongban.modal"

const QuanLiPhongBan = () => {
    return (
        <div className="flex justify-around h-[100vh] mt-8">
            <QLModal func="Thêm"/>
            <QLModal func="Sửa"/>
            <QLModal func="Xóa"/>
        </div>
    )
}

export default QuanLiPhongBan