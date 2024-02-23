import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const FormularioDialog = ({ onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    exportador: '',
    importador: '',
    dataEmbarque: '',
    previsaoDeEmbarque: '',
    dataChegada: '',
    previsaoDeChegada: '',
    di: '',
    navio: '',
    master: '',
    house: '',
    fatura: '',
    freteModo: '',
    container: '',
    canalParametrizacao: '',
    origem: '',
    destino: '',
    liberadoParaFaturamento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Preencher dados</DialogTitle>
      <DialogContent>
        <TextField name="exportador" label="Exportador" value={formValues.exportador} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="importador" label="Importador" value={formValues.importador} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="dataEmbarque" label="Data de Embarque" type="datetime-local" value={formValues.dataEmbarque} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField name="previsaoDeEmbarque" label="Previsão de Embarque" type="datetime-local" value={formValues.previsaoDeEmbarque} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField name="dataChegada" label="Data de Chegada" type="datetime-local" value={formValues.dataChegada} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField name="previsaoDeChegada" label="Previsão de Chegada" type="datetime-local" value={formValues.previsaoDeChegada} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField name="di" label="DI" value={formValues.di} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="navio" label="Navio" value={formValues.navio} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="master" label="Master" value={formValues.master} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="house" label="House" value={formValues.house} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="fatura" label="Fatura" value={formValues.fatura} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="freteModo" label="Frete Modo" value={formValues.freteModo} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="container" label="Container" value={formValues.container} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="canalParametrizacao" label="Canal Parametrização" value={formValues.canalParametrizacao} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="origem" label="Origem" value={formValues.origem} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="destino" label="Destino" value={formValues.destino} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="liberadoParaFaturamento" label="Liberado para Faturamento" type="datetime-local" value={formValues.liberadoParaFaturamento} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormularioDialog;