import { ref } from "vue";
import employeeApi from "../api/employeeApi";

/**
 * Các hàm dùng chung cho employee
 * Author: LHH - 04/01/23
 */
const useEmployee = () => {
	try {
		const listEmployee = ref([]);
		const newEmployeeCode = ref(null);
		const newEmployee = ref(null);
		const editEmployee = ref(null);
		const statusCode = ref(null);
		const totalPage = ref(null);
		const totalRecord = ref(null);
		const employeeCheck = ref(null);

		/**
		 * Lấy tất cả nhân viên
		 * Author: LHH - 04/01/23
		 */
		const getAllEmployee = async () => {
			try {
				const response = await employeeApi.getAllEmp();

				listEmployee.value = [...response];
				statusCode.value = null;
			} catch (error) {
				console.log(error);
			}
		};

		/**
		 * Lấy nhân viên theo filter
		 * Author: LHH - 04/01/23
		 */
		const getFilterEmployee = async (filter) => {
			try {
				const response = await employeeApi.getEmpByFilter(filter);
				const { TotalPage, TotalRecord, Data } = response;

				totalPage.value = TotalPage;
				totalRecord.value = TotalRecord;

				listEmployee.value = Data;
				statusCode.value = null;
			} catch (error) {
				console.log(error);

				totalPage.value = 0;
				totalRecord.value = 0;

				listEmployee.value = [];
			}
		};

		/**
		 * Lấy nhân viên theo id
		 * Author: LHH - 04/01/23
		 */
		const getEmployeeById = async (id) => {
			try {
				const response = await employeeApi.getEmpById(id);

				editEmployee.value = response;
				statusCode.value = null;
			} catch (error) {
				console.log(error);
			}
		};

		/**
		 * Lấy nhân viên theo id
		 * Author: LHH - 04/01/23
		 */
		const getNewEmployeeCode = async () => {
			try {
				const response = await employeeApi.getNewEmpCode();

				newEmployeeCode.value = response;
				statusCode.value = null;
			} catch (error) {
				throw error;
			}
		};

		/**
		 * Lấy nhân viên theo mã nhân viên
		 * Author: LHH - 10/01/23
		 */
		const getEmployeeByEmpCode = async (employeeCode) => {
			try {
				const response = await employeeApi.getEmpByFilter({
					employeeCode,
				});

				console.log("RESPONSE", response);

				employeeCheck.value = response.Data ? response.Data[0] : null;

				statusCode.value = null;
			} catch (error) {
				console.log(error);
			}
		};

		/**
		 * Thêm nhân viên mới
		 * Author: LHH - 04/01/23
		 */
		const addNewEmployee = async (employee) => {
			try {
				const response = await employeeApi.createEmp(employee);

				newEmployee.value = response;

				statusCode.value = response ? true : false;
			} catch (error) {
				console.log(error);
				statusCode.value = null;
			}
		};

		/**
		 * Cập nhật thông tin nhân viên
		 * Author: LHH - 04/01/23
		 */
		const updateNewEmployee = async (id, employee) => {
			try {
				const response = await employeeApi.updateEmp(id, employee);
				console.log(response);

				newEmployee.value = response;

				statusCode.value = response ? true : false;
			} catch (error) {
				console.log(error);
				statusCode.value = null;
			}
		};

		/**
		 * Xóa nhân viên
		 * Author: LHH - 04/01/23
		 */
		const deleteEmployee = async (id) => {
			try {
				const response = await employeeApi.deleteEmp(id);

				console.log(response);
				statusCode.value = response ? true : false;
			} catch (error) {
				console.log(error);
				statusCode.value = null;
			}
		};

		return {
			listEmployee,
			newEmployeeCode,
			newEmployee,
			editEmployee,
			employeeCheck,
			statusCode,
			totalPage,
			totalRecord,
			getAllEmployee,
			getFilterEmployee,
			getEmployeeById,
			getNewEmployeeCode,
			getEmployeeByEmpCode,
			addNewEmployee,
			updateNewEmployee,
			deleteEmployee,
		};
	} catch (error) {
		console.log(error);
	}
};

export default useEmployee;
