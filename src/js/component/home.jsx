import React ,{useState, useEffect} from "react";//1.importar el hook useState de react



//create your first component
 
const Home = () => {

  const [tarea, setTarea]=useState("");
	const [add, setAdd]=useState([]);
	const[visible,setVisible] = useState("none");
	const[hoverIndex,setHoverIndex] =useState(null);
 
 useEffect(() => {
    // Llama a la función para obtener el usuario
  
    //CreateUsuario();
    ObtenerTareas();
    
    
  }, []);



  

 function CreateUsuario(){
    fetch('https://playground.4geeks.com/apis/fake/todos/user/cesar86', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
         // Será true (verdad) si la respuesta es exitosa.
        if(resp.status === 400) {
          ObtenerTareas()
        } 
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

 function ObtenerTareas(){
    fetch('https://playground.4geeks.com/apis/fake/todos/user/cesar86') 
      
     
    
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
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
  function ActualizarTareas(){
    fetch('https://playground.4geeks.com/apis/fake/todos/user/cesar86', {
      method: "PUT",
      body:JSON.stringify([
        { label: "Make the bed", done: false },
        { label: "Walk the dog", done: false },
        { label: "Do the replits", done: false }
    ])
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
          //const nuevosDatos = [...prevadd, { label: tarea, done: false }];
          
        
        aux=[...add, { label: tarea, done: false }];
       // ActualizarTareas(aux);
        
      };
      setTarea("");
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
    <div style={{backgroundColor:"blue"}}>
        <div className="w-50 mx-auto"style={{backgroundColor:"yellowgreen"}}>
            <h1>Todos</h1>
            <input type="text" className="form-control" aria-label="Large" value={tarea} onChange={handletarea} onKeyUp={handleadd}/>
            <ul style={{ ListStyleType:"none", display:"flex", flexDirection:"column",gap:"10px"}}>
                {add.length > 0 ? add.map((item, index) => (
                    <li key={index} style={{ fontWeight:"700",display:"flex", justifyContent:"space-between" ,alignItems:"center"}}onMouseEnter={()=> mouseOn(index)} onMouseLeave={mouseOff}>
                        <span>{item.label}</span>
                        <span style={{ display: hoverIndex === index ? visible :"none"}}  onClick={() => deleteAdd(index)}>X</span>
                    </li>
                )) : <p>No hay tareas </p>  
                }
            </ul>
            <button onClick={eliminarLista}>Elimina lista completa</button>
            <span style={{backgroundColor:"yellow"}}> {add.length} items left</span>
        </div>
    </div>
);
};

export default Home;