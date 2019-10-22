import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Orders from './mocks/orders.json';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';





export class DoughnutChart extends Component {

  render() {
    const data = {
      labels: ['Open Orders', 'Closed Orders'],
      datasets: [
        {
          data: this.props.data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB"

          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB"

          ]
        }]
    };

    return (
      <div className='order-graphWrapper'>
        <div className="content-section introduction">
          <h1>Open/Close Orders</h1>
        </div>
        <div className="content-section implementation">
          <Chart type="doughnut" data={data} />
        </div>


      </div>
    )
  }
}

export class OrderTable extends Component {
  constructor() {
    super();
    this.state = {
      globalFilter: null
    };

  }
  componentDidMount() {
    this.setState({ sorders: this.props.data })
  }
  render() {
    //var carCount = this.state.cars ? this.state.cars.length : 0;
    let header = (
      <div style={{ 'textAlign': 'left' }}>
        <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" size="50" />
      </div>
    );


    return (
      <DataTable value={this.state.sorders} header={header} globalFilter={this.state.globalFilter} paginator={true} rows={10}>
        <Column field="soNumber" header="Sales Order" sortable={true} filter={true} />
        <Column field="dateCreated" header="Date" sortable={true} />
        <Column field="companyRefNumber" header="Po Ref" sortable={true} />
        <Column field="itemNumber" header="Line item" sortable={true} />
        <Column field="shipAddress1" header="Ship To" sortable={true} />
        <Column field="companyName" header="Customer" sortable={true} />
        <Column field="pnUpper" header="Part Number" sortable={true} filter={true} />
      </DataTable>
    );
  }
}


const OrdersData = () => {

  const sOrders = Orders.orders.sOrders.data; //sOrders
  const pOrders = Orders.orders.pOrders.data; //pOrders
  const invoice = Orders.orders.invoices.data; //Invoices

  //Counting sOrder Open/close
  const openOrder = sOrders.filter(obj => obj.openFlag === 'F').length;
  const closeOrder = sOrders.filter(obj => obj.openFlag === 'T').length;

  //Counting pOrder Open/close
  const openpOrder = pOrders.filter(obj => obj.openFlag === 'F').length;
  const closepOrder = pOrders.filter(obj => obj.openFlag === 'T').length;

  //Counting invoices Open/close
  const openInvoices = invoice.filter(obj => obj.openFlag === 'F').length; //Open Orders for Invoices
  const closeInvoice = invoice.filter(obj => obj.openFlag === 'T').length; //Close Orders for Invoices

  //Graph Data
  const dataGraphOrders = {
    sOrders: [openOrder, closeOrder],
    pOrders: [openpOrder, closepOrder],
    invoices: [openInvoices, closeInvoice],
  }

  return (
    <div className='wrapper'>
      <h1 className='orders-mainTitle'>Sales Orders Dashboard</h1>
      <Tabs>
        <TabList>
          <Tab>sOrders</Tab>
          <Tab>pOrders</Tab>
          <Tab>Invoices</Tab>
        </TabList>

        <TabPanel>
          <DoughnutChart data={dataGraphOrders.sOrders} name='Open/Close sOrders' />
          <OrderTable data={sOrders} />
        </TabPanel>
        <TabPanel>
          <DoughnutChart data={dataGraphOrders.pOrders} />
          <OrderTable data={pOrders} />
        </TabPanel>
        <TabPanel>
          <DoughnutChart data={dataGraphOrders.invoices} />
          <OrderTable data={invoice} />
        </TabPanel>
      </Tabs>
    </div>
  );
};


class App extends Component {


  render() {
    return (
      <div className="App">
        <OrdersData />
      </div>
    );
  }
}

export default App;
