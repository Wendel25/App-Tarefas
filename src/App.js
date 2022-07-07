//Desenvolvido por Wendel Lucca https://github.com/Wendel25

import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const [tarefas, setarTarefas] = useState([

  ]);
  const [modal, setModal] = useState(false);

  const salvarTarefa = () => {
    var tarefa = document.getElementById('content-tarefa');
    
    setarTarefas([
      ...tarefas,
      {
        id: new Date().getTime(),
        tarefa: tarefa.value,
        finalizada:false
      }
    ]);

    window.localStorage.setItem('tarefas',JSON.stringify([
      ...tarefas,
      {
        id: new Date().getTime(),
        tarefa: tarefa.value,
        finalizada:false
      }
    ]));

    setModal(false)
  }

  const marcarConcluida = (id, opt) => {
    let novasTarefas = tarefas.filter(function(val){
      if(val.id == id){
        val.finalizada = opt;
      }
        return val;
    })

    setarTarefas(novasTarefas);
    window.localStorage.setItem('tarefas',JSON.stringify(novasTarefas));
  }

  const abrirModal = () => {
    setModal(!modal);
  }

  const deletarTarefa = (id) => {
    let novasTarefas = tarefas.filter(function(val){
      if(val.id != id){
        return val;
      }
    })

    setarTarefas(novasTarefas);
    window.localStorage.setItem('tarefas',JSON.stringify(novasTarefas));
  }


  useEffect(() =>{
    if(window.localStorage.getItem('tarefas') !== undefined){
      setarTarefas(JSON.parse(window.localStorage.getItem('tarefas')));
      console.log((window.localStorage.getItem('tarefas')));
    }
  }, [])

  return (
    <div className="App">
      {
        modal?
        <div className='modal'>
          <div className='modalContent'>
            <h3 className='text-modal'><b>Adicionar nova tarefa</b></h3>
            <input className='input-modal' id='content-tarefa' type="text"></input>
            <button className='btn-btn' onClick={()=>salvarTarefa()}>Salvar</button>
          </div>
        </div>
        :
        <div></div>
      }

      <div onClick={() => abrirModal()} className='addTarefa'>+</div>
      <div className='limpar'>Limpar</div>

      <div className='boxTarefas'>
        <h2 className='textColor'>Minhas Tarefas do Dia!</h2>  
        {
          tarefas.map((val) => {
            if(!val.finalizada){
              return (
                <div className='tarefaSingle'>
                  <p onClick={()=>marcarConcluida(val.id,true)}>{val.tarefa}</p>
                  <span onClick={() =>deletarTarefa(val.id)} style={{color:'white'}}>X</span>
                </div>
              );
            }else{
              return(
                <div className='tarefaSingle'>
                <p onClick={()=>marcarConcluida(val.id,false)} style={{textDecoration: 'line-through'}}>{val.tarefa}</p>
                <span onClick={() =>deletarTarefa(val.id)} style={{color:'white'}}>X</span>
                </div>
              );
            }
          })
        }
        
      </div>
    </div>

  );
}

export default App;
