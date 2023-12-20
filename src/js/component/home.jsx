import React ,{useState, useEffect} from "react";//1.importar el hook useState de react



//create your first component
 
const Home = () => {

  const [tarea, setTarea]=useState("");
	const [add, setAdd]=useState([]);
	const[visible,setVisible] = useState("none");
	const[hoverIndex,setHoverIndex] =useState(null);
 
 useEffect(() => {
    // Llama a la función para obtener el usuario
  
  
    obtenerTareas();
    
    
  }, []);



  

 function createUsuario(){
    fetch('https://playground.4geeks.com/apis/fake/todos/user/cesar86', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
         // Será true (verdad) si la respuesta es exitosa.
        
         // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log("Nuevo usuario creado:cesar86",data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
  }

 function obtenerTareas(){
    fetch('https://playground.4geeks.com/apis/fake/todos/user/cesar86') 
      
     
    
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        if(resp.status === 404) {
          createUsuario()
        }  // el código de estado = 200 o código = 400 etc.
       // console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        setAdd(data);
        //console.log(add);
    
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });

  }
  function actualizarTareas(nuevaLista){
    fetch('https://playground.4geeks.com/apis/fake/todos/user/cesar86', {
      method: "PUT",
      body:JSON.stringify(nuevaLista)
,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        //console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
    

  }
  


	
//funciones del paso 3
	function handletarea(event){
			setTarea(event.target.value);

		}
    

	
    function handleadd(event) {
      let aux=[];
      if (event.key === "Enter") {
          setAdd([...add, { label: tarea, done: false }]); 
        aux=[...add, { label: tarea, done: false }];
        actualizarTareas(aux);
        setTarea("");
    
      };
      
    }
      
    
	function deleteAdd (item) {
			setAdd((prevState) =>
			  prevState.filter((e,index) => index !== item)
			  
			)
		}

  function eliminarLista() {
      fetch("https://playground.4geeks.com/apis/fake/todos/user/cesar86", {
        method: "DELETE",
      })
        .then(() => {
          setAdd([]);
        })
        .catch((error) => console.log(error));
    }
	function mouseOn(index){
		setVisible("flex");
		setHoverIndex(index);
		

	}
	function mouseOff(){
		setVisible("none");
	}
	
  return (
    <div className="bg-primary">
        <div className="w-50 mx-auto bg-warning">
            <h1>Todos</h1>
            <input type="text" className="form-control" aria-label="Large" value={tarea} onChange={handletarea} onKeyUp={handleadd}/>
            <ul className="lista d-flex flex-column gap-3">
                {add.length > 0 ? add.map((item, index) => (
                    <li key={index} className="fw-bold d-flex justify-content-between alignItems-center" onMouseEnter={()=> mouseOn(index)} onMouseLeave={mouseOff}>
                        <span>{item.label}</span>
                        <span className= "display: hoverIndex === index ? visible :none "  onClick={() => deleteAdd(index)}>X</span>
                    </li>
                )) : <p>No hay tareas </p>  
                }
            </ul>
            <button onClick={eliminarLista}>Elimina lista completa</button>
            <span className="bg-danger"> {add.length} items left</span>
        </div>
    </div>
);
};

export default Home;