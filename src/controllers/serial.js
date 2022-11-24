
exports.statusLora = () => {
    escreverSerial("statusLora");
    let res = lerSerial();
    return {status: res.indexOf("ERR") ? "Erro" : "Sucesso", status_id: res.indexOf("ERR") ? false: true, message: res};
}
exports.setarVertice = (id, latitude, longitude) => {
    escreverSerial(`setarVertice ${id} ${latitude} ${longitude}`);
    let res = lerSerial();
    return {status: res.indexOf("ERR") ? "Erro" : "Sucesso", status_id: res.indexOf("ERR") ? false: true, message: res};
}
exports.obterPonto = (id) => {
    escreverSerial(`obterPonto ${id}`);
    let res = lerSerial();
    let ponto = res.split(" ");
    return {
        status: res.indexOf("ERR") ? "Erro" : "Sucesso", 
        status_id: res.indexOf("ERR") ? false: true, 
        message: res, 
        point: res.indexOf("ERR") ? {} : {latitude: ponto[0], longitude: ponto[1], profundidade: ponto[2]}
    };
}
exports.rth = () => {
    escreverSerial("rth");
    let res = lerSerial();
    return {status: res.indexOf("ERR") ? "Erro" : "Sucesso", status_id: res.indexOf("ERR") ? false: true, message: res};
}
exports.iniciar = () => {
    escreverSerial("iniciar");
    let res = lerSerial();
    return {status: res.indexOf("ERR") ? "Erro" : "Sucesso", status_id: res.indexOf("ERR") ? false: true, message: res};
}
exports.parar = () => {
    escreverSerial("parar");
    let res = lerSerial();
    return {status: res.indexOf("ERR") ? "Erro" : "Sucesso", status_id: res.indexOf("ERR") ? false: true, message: res};
}
exports.status = () => {
    escreverSerial(`status`);
    let res = lerSerial();
    let dados = res.split(" ");
    return {
        status: res.indexOf("ERR") ? "Erro" : "Sucesso", 
        status_id: res.indexOf("ERR") ? false: true, 
        message: res, 
        data: res.indexOf("ERR") ? {} : {status: dados[0], bateria: dados[1], latiAtual: dados[2], longiAtual: dados[3], profAtual: dados[4]}
    };
}

exports.escreverSerial = (comando) =>{

}
exports.lerSerial = (caracterIgnoravel = "!") =>{
    let res = "";
    
    return res.split(caracterIgnoravel)[0];
}


