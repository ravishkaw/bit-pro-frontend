import {
  Row,
  Col,
  Card,
  Flex,
  Statistic,
  Tooltip,
  Badge,
  Progress,
} from "antd";
import {
  TeamOutlined,
  CrownOutlined,
  UserOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";

const EmployeeStatistics = ({ employeeHookData }) => {
  const [statistics, setStatistics] = useState({
    totalEmployees: 0,
    admins: 0,
    managers: 0,
    receptionists: 0,
    employees: 0,
  });

  useEffect(() => {
    if (employeeHookData?.data) {
      const totalEmployees = employeeHookData?.data?.length || 0;
      const admins = employeeHookData?.data?.filter(
        (employee) => employee.designationName === "Admin"
      ).length;
      const managers = employeeHookData?.data?.filter(
        (employee) => employee.designationName === "Manager"
      ).length;
      const receptionists = employeeHookData?.data?.filter(
        (employee) => employee.designationName === "Receptionist"
      ).length;
      const employees = employeeHookData?.data?.filter(
        (employee) => employee.designationName === "Employee"
      ).length;

      setStatistics({
        totalEmployees,
        admins,
        managers,
        receptionists,
        employees,
      });
    }
  }, [employeeHookData]);

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      {/* Total Employees Card */}
      <Col lg={6} sm={12} xs={24}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: "4px solid #666cff",
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Statistic
            title={
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Total Employees
              </span>
            }
            value={statistics.totalEmployees}
            valueStyle={{ color: "#666cff", fontSize: "24px" }}
            prefix={<TeamOutlined style={{ fontSize: "20px" }} />}
          />
        </Card>
      </Col>

      {/* Admin Card */}
      <Col lg={6} sm={12} xs={0}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: "4px solid #666cff",
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Statistic
            title={
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Administrators
              </span>
            }
            value={statistics.admins}
            valueStyle={{ color: "#666cff", fontSize: "24px" }}
            prefix={<CrownOutlined />}
            suffix={
              <small style={{ fontSize: "12px", marginLeft: "8px" }}>
                {statistics.totalEmployees > 0
                  ? Math.round(
                      (statistics.admins / statistics.totalEmployees) * 100
                    )
                  : 0}
                % of staff
              </small>
            }
          />
        </Card>
      </Col>

      {/* Manager Card */}
      <Col lg={6} sm={12} xs={0}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: `4px solid #666cff`,
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Statistic
            title={
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Managers
              </span>
            }
            value={statistics.managers}
            valueStyle={{ color: "#666cff", fontSize: "24px" }}
            prefix={<UserOutlined />}
            suffix={
              <small style={{ fontSize: "12px", marginLeft: "8px" }}>
                {statistics.totalEmployees > 0
                  ? Math.round(
                      (statistics.managers / statistics.totalEmployees) * 100
                    )
                  : 0}
                % of staff
              </small>
            }
          />
        </Card>
      </Col>

      {/* Employee Card */}
      <Col lg={6} sm={12} xs={0}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: `4px solid #666cff`,
          }}
          styles={{ body: { padding: "16px" } }}
        >
          <Flex align="center" justify="space-between">
            <Statistic
              title={
                <span style={{ fontSize: "15px", fontWeight: "600" }}>
                  Staff
                </span>
              }
              value={statistics.employees + statistics.receptionists}
              valueStyle={{
                color: "#666cff",
                fontSize: "24px",
              }}
              prefix={<ToolOutlined />}
            />
            <Flex vertical align="start" style={{ minWidth: "100px" }}>
              <div style={{ marginBottom: "4px" }}>
                <Badge
                  color="#666cff"
                  text={`${statistics.receptionists} Reception`}
                />
              </div>
              <div>
                <Badge
                  color="#666cff"
                  text={`${statistics.employees} General`}
                />
              </div>
            </Flex>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};

export default EmployeeStatistics;
