import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./image/logo.png"
import * as XLSX from "xlsx"
// import Invoice from './components/reports/Invoice'
// import invoice from './data/invoice'

const TechnicalSheet = ({ data2, image1, image2,nameFile }) => (
  <Document>
    <Page size="A4" style={styles.page}>
    <View style={styles.header}>
        <Image src={logo} style={styles.logo} />
      </View>
    <View style={styles.containerTitle}>
      <Text style={styles.title}>Technical Sheet {nameFile} </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.imageWrapper}>
            <Image src={image1} style={styles.image1} />
          </View>
          <View style={styles.paramsWrapper}>
            <View style={styles.param}>
              <Text style={styles.paramLabel}>Voltaggio:</Text>
              <Text style={styles.paramValue}>{data2[0]}</Text>
            </View>
            <View style={styles.param}>
              <Text style={styles.paramLabel}>Altezza:</Text>
              <Text style={styles.paramValue}>{data2[1]}</Text>
            </View>
            <View style={styles.param}>
              <Text style={styles.paramLabel}>Lunghezza:</Text>
              <Text style={styles.paramValue}>{data2[2]}</Text>
            </View>
            <View style={styles.param}>
              <Text style={styles.paramLabel}>Profondità:</Text>
              <Text style={styles.paramValue}>{data2[3]}</Text>
            </View>
            <View style={styles.param}>
              <Text style={styles.paramLabel}>Isolamento:</Text>
              <Text style={styles.paramValue}>{data2[4]}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.bottom}>
          <Text style={styles.paramLabel}>Disegno tecnico:</Text>
          <Image src={image2} style={styles.image2} />
        </View>
        </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxSizing: "border-box",
    height: "100vh",
  },
  containerTitle:{
    textAlign:"center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  bottom: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
  },
  imageWrapper: {
    flexBasis: "40%",
    flexGrow: 1,
    marginRight: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paramsWrapper: {
    flexBasis: "60%",
    flexGrow: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    maxWidth: "200px",
    maxHeight: "200px",
  },
  image1: {
    maxWidth: "900px",
    maxHeight: "900px",
  },
  image2: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  param: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  paramLabel: {
    fontWeight: "bold",
  },
});

const App = () => {
  const [data, setData] = useState({});
  const [data1, setData1] = useState([1]);
  const [image1, setImage1] = useState(undefined);
  const [image2, setImage2] = useState(undefined);
  const [error, setError] = useState("");
  const [nameFile, setNameFile] = useState("");

  const readFile = (e) => {
    if (e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = XLSX.read(event.target.result, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(ws);
        return setData1(jsonData);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  

 const valori = Object.values(data1[0])
 console.log(valori)


  const handleChange = (e) => {
    if (image1 && image2 !== undefined) {
      setData({ ...data, [e.target.name]: e.target.value });
            
    } else {
      setError("Inserisci Prima Le foto");
      e.target.value = "";
      setData({})
    }
  };

  const handleImage1Change = (e) => {
    if (e.target.files.length !== 0) {
      setImage1(URL.createObjectURL(e.target.files[0]));
     
    }
    // setImage1(URL.createObjectURL(e.target.files[0]));
  };

  const handleImage2Change = (e) => {
    if (image1 && e.target.files.length !== 0) {
      setImage2(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handlenameFile = (e) => {
    setNameFile(e.target.value); // Imposta nameFile dal nuovo valore
    console.log (nameFile)
  };



useEffect(() => {
if (error){
  setTimeout(function() {
    setError("")
  }, 3000);
}
  
}, [error])

  return (
    <div className="container-fluid">
      <div className="mb-3">
      <label className="form-label">Name Product:</label>
      <input type="text" name="nameProduct" onChange={handlenameFile} />
        <br />
        <label className="form-label">Voltaggio:</label>
        <input type="text" name="voltaggio" onChange={handleChange} />
        <br />
        <label className="form-label">Altezza:</label>
        <input type="text" name="altezza" onChange={handleChange} />
        <br />
        <label className="form-label">Lunghezza:</label>
        <input type="text" name="lunghezza" onChange={handleChange} />
        <br />
        <label className="form-label">Profondità:</label>
        <input type="text" name="profondità" onChange={handleChange} />
        <br />
        <label className="form-label">Isolamento:</label>
        <input type="text" name="isolamento" onChange={handleChange} />
        <br />
        <label className="form-label">Foto del prodotto:</label>
        <input type="file" name="fotoProdotto" onChange={handleImage1Change} />
        <br />
        <label className="form-label">Disegno tecnico:</label>
        <input type="file" name="fotoDisegno" onChange={handleImage2Change} />
        <br />
        {error && <div style={{ color: "red",fontWeight:"bold" }}>{error}</div>}
        
        <PDFDownloadLink
        document={
          <TechnicalSheet
            data={data}
            data2={valori} // Pass form data to TechnicalSheet
            image1={image1}
            image2={image2}
            nameFile={nameFile}
          />
        }
        fileName={nameFile}
      >
        <button className="btn btn-primary">Genera PDF</button>
      </PDFDownloadLink>
     </div>
      <form>
        <label htmlFor="upload">Upload File</label>
        <input type="file" name="upload" id="upload" onChange={readFile} />
      </form>
    </div>
  );
};

export default App;
