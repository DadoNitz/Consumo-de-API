import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; 
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './styles.css'
import numericStringComparator from './numericStringComparator';

const RecruitmentList = ({ darkMode }) => {
  const [recruitments, setRecruitments] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://localhost:7102/api/Recruitment')
      .then(response => setRecruitments(response.data))
      .catch(error => console.error(error));
  };

  const deleteItem = (id) => {
    const isConfirmed = window.confirm('Tem certeza de que deseja excluir este item?');
    if (!isConfirmed) return;

    axios.delete(`https://localhost:7102/api/Recruitment/${id}`)
      .then(() => {
        const newRecruitments = recruitments.filter(item => item.id !== id);
        setRecruitments(newRecruitments);
        showNotification('Item excluído com sucesso', 'success');
      })
      .catch(error => {
        console.error('Erro ao excluir item:', error);
        showNotification('Ocorreu um erro ao excluir o item', 'error');
      });
  };

  const saveChanges = () => {
    recruitments.forEach((item) => {
      if (item.id) {
        axios.put(`https://localhost:7102/api/Recruitment/${item.id}`, item)
          .then(response => {
            console.log(`Item com ID ${item.id} atualizado com sucesso`);
            showNotification(`Itens atualizados com sucesso`, 'success');
          })
          .catch(error => {
            console.error(`Erro ao atualizar item com ID ${item.id}:`, error);
          });
      } else {
        axios.post('https://localhost:7102/api/Recruitment', item)
          .then(response => {
            console.log('Nova linha adicionada com sucesso:', response.data);
            fetchData();
            showNotification('Nova linha adicionada com sucesso', 'success');
          })
          .catch(error => {
            console.error('Erro ao adicionar nova linha:', error);
          });
      }
    });
  };

  const addNewRow = () => {
    const newRow = {
      exportador: "string",
      importador: "string",
      dataEmbarque: "2024-02-15T19:17:29.892Z",
      previsaoDeEmbarque: "2024-02-15T19:17:29.892Z",
      dataChegada: "2024-02-15T19:17:29.892Z",
      previsaoDeChegada: "2024-02-15T19:17:29.892Z",
      di: "string",
      navio: "string",
      master: "string",
      house: "string",
      fatura: "string",
      freteModo: "string",
      container: "string",
      canalParametrizacao: "string",
      origem: "string",
      destino: "string",
      liberadoParaFaturamento: "2024-02-15T19:17:29.892Z"
    };
  
    axios.post('https://localhost:7102/api/Recruitment', newRow)
      .then(response => {
        console.log('Nova linha adicionada com sucesso:', response.data);
        fetchData();
        showNotification('Nova linha adicionada com sucesso', 'success');
      })
      .catch(error => {
        console.error('Erro ao adicionar nova linha:', error);
      });
  };

  const CustomButtonComponent = (props) => {
    return (
      <button className="deleteButton" onClick={() => deleteItem(props.data.id)}>
        Delete
      </button>
    );
  };

  const columnDefs = [
    { field: 'Excluir Item', cellRenderer: CustomButtonComponent},
    { headerName: "Exportador", field: "exportador", editable: true, comparator: numericStringComparator },
    { headerName: "Importador", field: "importador", editable: true },
    { headerName: "Data de Embarque", field: "dataEmbarque"},
    { headerName: "Previsão de Embarque", field: "previsaoDeEmbarque"},
    { headerName: "Data de Chegada", field: "dataChegada"},
    { headerName: "Previsão de Chegada", field: "previsaoDeChegada"},
    { headerName: "DI", field: "di", editable: true },
    { headerName: "Liberado para Faturamento", field: "liberadoParaFaturamento", editable: true },
    { headerName: "Navio", field: "navio", editable: true },
    { headerName: "Master", field: "master", editable: true },
    { headerName: "House", field: "house", editable: true },
    { headerName: "Fatura", field: "fatura", editable: true },
    { headerName: "Frete Modo", field: "freteModo", editable: true },
    { headerName: "Container", field: "container", editable: true },
    { headerName: "Canal Parametrização", field: "canalParametrizacao", editable: true },
    { headerName: "Origem", field: "origem", editable: true },
    { headerName: "Destino", field: "destino", editable: true },
  ]; 

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };
  
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Snackbar open={!!notification} autoHideDuration={6000} onClose={handleCloseNotification}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseNotification} severity={notification?.type}>
          {notification?.message}
        </MuiAlert>
      </Snackbar>
      <div>
        <TextField 
          label="Pesquisar"
          value={searchTerm}
          onChange={handleSearchTermChange}
          style={{marginTop: '30px', marginBottom: '10px', color: 'white', borderColor: 'white' }}
          InputLabelProps={{
            style: { color: 'white' }
          }}      
        />
      </div>
      <div className={`ag-theme-${darkMode ? 'alpine-dark' : 'alpine'}`} style={{ height: 500, width: 1200 }}>
        <AgGridReact
          rowData={recruitments.filter(item => 
            Object.values(item).some(value => 
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
          )}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={pageSize}
          searchTerm={searchTerm}
          enableSorting={true}
          enableFilter={true}
          onGridReady={onGridReady}
          suppressCellSelection={true}
        />
      </div>
      <div>
        <Button variant="contained" onClick={addNewRow} style={{ marginRight: '10px' }}>Adicionar item</Button>
        <Button variant="contained" onClick={saveChanges}>Salvar Alterações</Button>
      </div>
    </div>
  );
} 

export default RecruitmentList;
