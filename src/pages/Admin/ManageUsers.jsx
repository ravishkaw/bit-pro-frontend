import { Col, Flex, Row, Typography, Table, Form, Input, Card } from "antd";

import { userColumnItems } from "../../components/DataDisplay/Table/ColumnItems";

const ManageUsers = () => {
  const columns = userColumnItems();

  return (
    <>
      <Row>
        <Col span={24}>
          <Flex justify="space-between" align="">
            <Typography.Title level={3}>Manage Users</Typography.Title>
          </Flex>

          <Row gutter={[20, 20]}>
            <Col xs={24} md={8}>
              <Card>
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  labelAlign="left"
                >
                  <Form.Item name="username" label="Username" hasFeedback>
                    <Input placeholder="username" />
                  </Form.Item>

                  <Form.Item name="email" label="Email" hasFeedback>
                    <Input
                      placeholder="E.g., john.doe@example.com"
                      type="email"
                    />
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col xs={24} md={16}>
              <Table columns={columns} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ManageUsers;
