import React, { Component } from 'react';
import DynamicForm from './components/Form/DynamicForm';
import schema from './schema.json';
import defaultValues from './defaultValues.json';
import {
  Card, CardHeader, CardBody, Row, Col
} from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    defaultValues: {},
    schema: schema
  }

  onSubmit = (model) => {
    console.log(model);
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col md={12} xs={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title">Category</h4>
              </CardHeader>
              <CardBody>
                <DynamicForm className="form"
                  title="Dynamic From"
                  defaultValues={this.state.defaultValues}
                  schema={this.state.schema}
                  onSubmit={(model) => { this.onSubmit(model) }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;