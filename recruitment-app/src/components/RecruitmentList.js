import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; 
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './styles.css'; 

const RecruitmentList = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [idToDelete, setIdToDelete] = useState('');
  const [deleteError, setDeleteError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://localhost:7102/api/Recruitment')
      .then(response => setRecruitments(response.data))
      .catch(error => console.error(error));
  };

  const deleteItem = (id) => {
    axios.delete(`https://localhost:7102/api/Recruitment/${id}`)
      .then(() => {
        fetchData();
        showNotification('Item excluído com sucesso', 'success');
      })
      .catch(error => {
        console.error(error);
        setDeleteError('Ocorreu um erro ao excluir o item.');
      });
  };

  const saveChanges = () => {
    recruitments.forEach((item) => {
      if (item.id) {
        axios.put(`https://localhost:7102/api/Recruitment/${item.id}`, item)
          .then(response => {
            console.log(`Item com ID ${item.id} atualizado com sucesso`);
            showNotification(`Item com ID ${item.id} atualizado com sucesso`, 'success');
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
    const maxId = recruitments.reduce((max, item) => (item.id > max ? item.id : max), 0);
    const newId = maxId + 1;
  
    const newRow = {
      id: newId,
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

  const columnDefs = [
    { headerName: "ID", field: "id",  editable: true , width: 100, comparator: (a, b) => Number(a) - Number(b) },
    { headerName: "Exportador", field: "exportador", editable: true },
    { headerName: "Importador", field: "importador", editable: true },
    { headerName: "Data de Embarque", field: "dataEmbarque", editable: true },
    { headerName: "Previsão de Embarque", field: "previsaoDeEmbarque", editable: true },
    { headerName: "Data de Chegada", field: "dataChegada", editable: true },
    { headerName: "Previsão de Chegada", field: "previsaoDeChegada", editable: true },
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
    { headerName: "Destino", field: "destino", editable: true }
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

  return (
    <div>
      <Snackbar open={!!notification} autoHideDuration={6000} onClose={handleCloseNotification}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseNotification} severity={notification?.type}>
          {notification?.message}
        </MuiAlert>
      </Snackbar>
      <div className="ag-theme-alpine-dark" style={{ height: 500, width: 1000 }}>
        <AgGridReact
          rowData={recruitments}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          enableSorting={true}
          enableFilter={true}
          onGridReady={onGridReady}
          suppressCellSelection={true}
        />
      </div>
      <div>
        <Button variant="contained" onClick={addNewRow} style={{ marginRight: '10px' }}>Adicionar Nova Linha</Button>
        <Button variant="contained" onClick={saveChanges}>Salvar Alterações</Button>
      </div>
      <div>
        <input 
          type="text" 
          value={idToDelete} 
          onChange={(e) => setIdToDelete(e.target.value)} 
          placeholder="ID para excluir"
          style={{
            padding: '9px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
            width: '200px',
            margin: '10px',
            background: '#333',
            color: '#fff',
          }}
        />
        <Button  style={{marginTop: '5px' }}variant="contained" color="error" onClick={() => deleteItem(idToDelete)}>Excluir</Button>
        {deleteError && <p>{deleteError}</p>}
      </div>
    </div>
    
  );
};

export default RecruitmentList;
