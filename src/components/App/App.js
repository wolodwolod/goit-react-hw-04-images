import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import  Container  from 'components/Container';
import  Searchbar  from 'components/Searchbar';
import  ImageGallery  from 'components/ImageGallery';
import  Button  from 'components/Button';
import  Modal  from 'components/Modal';
import  Loader  from 'components/Loader';


export class App extends Component {

  state = {
    images: [],
    query: '',
    error: null,
    page: 1,
    showModal: false,
   
  };

  render() {


    return (
      <Container>
      
        <Searchbar onSubmit={this.handleSearchSubmit} />

        
      {/* <ToastContainer theme="colored" position="top-right" autoClose={3000} /> */}
      </Container>
      
    )
  }
};
