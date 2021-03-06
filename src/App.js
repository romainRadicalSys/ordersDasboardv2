import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Moment from 'react-moment';
import 'react-tabs/style/react-tabs.css';
import Orders from './mocks/orders.json';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Component to diplay Graphs Open/Closed order
export class DoughnutChart extends Component {
  render() {
    const data = {
      labels: ['Open Orders', 'Closed Orders'],
      datasets: [
        {
          data: this.props.data,
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    };

    return (
      <div className="order-graphWrapper">
        <div className="content-section introduction">
          <h1>Open/Close Orders</h1>
        </div>
        <div className="content-section implementation">
          <Chart type="doughnut" data={data} />
        </div>
      </div>
    );
  }
}

// Component to diplay table with orders data
export class OrderTable extends Component {
  constructor() {
    super();
    this.state = {
      globalFilter: null
    };
  }
  componentDidMount() {
    this.setState({ sorders: this.props.data });
  }

  dateFormatingTemplate(rowData, column) {
    return (
      <span>
        {' '}
        <Moment format="DD/MM/YYYY">{rowData.dateCreated}</Moment>
      </span>
    );
  }
  render() {
    //var carCount = this.state.cars ? this.state.cars.length : 0;
    let header = (
      <div style={{ textAlign: 'left' }}>
        <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
        <InputText
          type="search"
          onInput={e => this.setState({ globalFilter: e.target.value })}
          placeholder="Global Search"
          size="50"
        />
      </div>
    );

    return (
      <DataTable
        value={this.state.sorders}
        header={header}
        globalFilter={this.state.globalFilter}
        paginator={true}
        rows={10}
      >
        <Column field="soNumber" header="Sales Order" sortable={true} filter={true} />
        <Column field="dateCreated" header="Date" sortable={true} body={this.dateFormatingTemplate} />
        <Column field="companyRefNumber" header="Po Ref" sortable={true} />
        <Column field="itemNumber" header="Line item" sortable={true} />
        <Column field="shipAddress1" header="Ship To" sortable={true} />
        <Column field="companyName" header="Customer" sortable={true} />
        <Column field="pnUpper" header="Part Number" sortable={true} filter={true} />
      </DataTable>
    );
  }
}

// Main Component used to display the User Dashboard components Tables and Graphs
// I've used Tab to separates the different sections
// The library react-tabs is used to display the tabs sections
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
    invoices: [openInvoices, closeInvoice]
  };

  return (
    <div className="wrapper">
      <h1 className="orders-mainTitle">Sales Orders Dashboard</h1>
      <TabView>
        <TabPanel header='sOrders'>
          <div className='contentWrapper'>
            <DoughnutChart data={dataGraphOrders.sOrders} />
            <OrderTable data={sOrders} responsive={true} />
          </div>
        </TabPanel>
        <TabPanel header='pOrders'>
          <div className='contentWrapper'>
            <DoughnutChart data={dataGraphOrders.pOrders} />
            <OrderTable data={pOrders} responsive={true} />
          </div>
        </TabPanel>
        <TabPanel header='Invoices'>
          <div className='contentWrapper'>
            <DoughnutChart data={dataGraphOrders.invoices} />
            <OrderTable data={invoice} responsive={true} />
          </div>
        </TabPanel>
      </TabView>

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
