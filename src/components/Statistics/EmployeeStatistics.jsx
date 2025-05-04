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
  CustomerServiceOutlined,
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
    <Row gutter={[16, 16]} style={{ marginBottom: 12 }}>
      {/* Total Employees Card */}
      <Col lg={6} sm={12} xs={24}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: `4px solid #1890ff`,
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
            valueStyle={{ color: "#1890ff", fontSize: "24px" }}
            prefix={<TeamOutlined style={{ fontSize: "20px" }} />}
          />
          <Flex wrap justify="space-between" style={{ marginTop: "12px" }}>
            <Tooltip title="Team composition">
              <small style={{ color: "#666" }}>Staff Distribution</small>
            </Tooltip>
          </Flex>
        </Card>
      </Col>

      {/* Admin Card */}
      <Col lg={6} sm={12} xs={0}>
        <Card
          className="stat-card"
          style={{
            height: "100%",
            borderRadius: "8px",
            borderLeft: `4px solid #ff4d4f`,
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
            valueStyle={{ color: "#ff4d4f", fontSize: "24px" }}
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
          <Progress
            percent={
              statistics.totalEmployees > 0
                ? Math.round(
                    (statistics.admins / statistics.totalEmployees) * 100
                  )
                : 0
            }
            size="small"
            showInfo={false}
            strokeColor="#ff4d4f"
            style={{ marginTop: "8px" }}
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
            borderLeft: `4px solid #faad14`,
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
            valueStyle={{ color: "#faad14", fontSize: "24px" }}
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
          <Progress
            percent={
              statistics.totalEmployees > 0
                ? Math.round(
                    (statistics.managers / statistics.totalEmployees) * 100
                  )
                : 0
            }
            size="small"
            showInfo={false}
            strokeColor="#faad14"
            style={{ marginTop: "8px" }}
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
            borderLeft: `4px solid #722ed1`,
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
                color: "#722ed1",
                fontSize: "24px",
              }}
              prefix={<ToolOutlined />}
            />
            <Flex vertical align="end" style={{ minWidth: "100px" }}>
              <div style={{ marginBottom: "4px" }}>
                <Badge
                  color="#52c41a"
                  text={`${statistics.receptionists} Reception`}
                />
              </div>
              <div>
                <Badge
                  color="#722ed1"
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
