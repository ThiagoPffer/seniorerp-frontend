appModule.factory("ClienteService", ClienteService);

function ClienteService($http, properties) {

    function _getEstados() {
        return [
            {
                nome: 'Acre',
                uf: 'AC'
            },
            {
                nome: 'Alagoas',
                uf: 'AL'
            },
            {
                nome: 'Amapá',
                uf: 'AP'
            },
            {
                nome: 'Amazonas',
                uf: 'AM'
            },
            {
                nome: 'Bahia',
                uf: 'BA'
            },
            {
                nome: 'Ceará',
                uf: 'CE'
            },
            {
                nome: 'Distrito Federal',
                uf: 'DF'
            },
            {
                nome: 'Espírito Santo',
                uf: 'ES'
            },
            {
                nome: 'Goiás',
                uf: 'GO'
            },
            {
                nome: 'Maranhão',
                uf: 'MA'
            },
            {
                nome: 'Mato Grosso',
                uf: 'MT'
            },
            {
                nome: 'Mato Grosso do Sul',
                uf: 'MS'
            },
            {
                nome: 'Minas Gerais',
                uf: 'MG'
            },
            {
                nome: 'Pará',
                uf: 'PA'
            },
            {
                nome: 'Paraíba',
                uf: 'PB'
            },
            {
                nome: 'Paraná',
                uf: 'PR'
            },
            {
                nome: 'Pernambuco',
                uf: 'PE'
            },
            {
                nome: 'Piauí',
                uf: 'PI'
            },
            {
                nome: 'Rio de Janeiro',
                uf: 'RJ'
            },
            {
                nome: 'Rio Grande do Norte',
                uf: 'RN'
            },
            {
                nome: 'Rio Grande do Sul',
                uf: 'RS'
            },
            {
                nome: 'Rondônia',
                uf: 'RO'
            },
            {
                nome: 'Roraima',
                uf: 'RR'
            },
            {
                nome: 'Santa Catarina',
                uf: 'SC'
            },
            {
                nome: 'São Paulo',
                uf: 'SP'
            },
            {
                nome: 'Sergipe',
                uf: 'SE'
            },
            {
                nome: 'Tocantins',
                uf: 'TO'
            }
        ];
    }

    function _getEnderecoByCep(cep) {
        return $http.get(`${properties.apiCepBaseUrl}${cep}/json/`);
    }

    function _capitalizeNome(nome) {
        var stringArray = nome.toLowerCase().split(' ');
        for (var i = 0; i < stringArray.length; i++) {
            stringArray[i] = stringArray[i].charAt(0).toUpperCase() + stringArray[i].substring(1);     
        }
        return stringArray.join(' '); 
    }

    function _getModalClienteCadastro() {
        return {
            templateUrl: "src/pages/clientes/cadastro/modal-cliente-cadastro.html",
            controller: "ClienteCadastroController as vm",
            click: false
        }
    }

    function _convertDataListToExcelJson(dataList) {
        let newList = [];
        dataList.forEach(data => {
            let object = {
                id: data.id,
                universitario: data.universitario,
                observacoes: data.observacoes,
                cpf: data.documentoCpf,
                email: data.email,
                sexo: data.sexo,
                diametroDedo: data.diametroDedo,
                nome: data.nome,
                telefone: data.telefone,
                rg: data.documentoRg,
                codigo: data.codigo
            };
            if (data.conjugue) {
                let conjugueObject = {
                    conjugueRelacionamento: data.conjugue.relacionamento,
                    conjugueTelefone: data.conjugue.telefone,
                    conjugueNome: data.conjugue.nome,
                    conjugueEmail: data.conjugue.email,
                    conjugueDiametroDedo: data.conjugue.diametroDedo
                };
                object = Object.assign(conjugueObject, object);
            }
            if (data.endereco) {
                let enderecoObject = {
                    enderecoEstado: data.endereco.estado,
                    enderecoNumero: data.endereco.numero,
                    enderecoCidade: data.endereco.cidade,
                    enderecoCep: data.endereco.cep,
                    enderecoBairro: data.endereco.bairro,
                    enderecoComplemento: data.endereco.complemento,
                    enderecoLogradouro: data.endereco.logradouro,
                    enderecoPais: data.endereco.pais
                }
                object = Object.assign(enderecoObject, object);
            }
            newList.push(object);
        });
        return newList;
    }

    function _getExcelTemplate() {
        return [{
            id: "ID",
            codigo: "Código",
            nome: "Nome",
            telefone: "Telefone",
            email: "Email",
            rg: "RG",
            cpf: "CPF",
            sexo: "Sexo",
            diametroDedo: "Diâmetro do dedo",
            observacoes: "Observações",
            conjugueDiametroDedo: "[Cônjugue] Diâmetro do dedo",
            conjugueEmail: "[Cônjugue] Email",
            conjugueNome: "[Cônjugue] Nome",
            conjugueRelacionamento: "[Cônjugue] Relacionamento",
            conjugueTelefone: "[Cônjugue] Telefone",
            universitario: "Universitário",
            possuiFilhos: "Possui filhos",
            enderecoBairro: "[Endereço] Bairro",
            enderecoCep: "[Endereço] CEP",
            enderecoCidade: "[Endereço] Cidade",
            enderecoComplemento: "[Endereço] Complemento",
            enderecoEstado: "[Endereço] Estado",
            enderecoLogradouro: "[Endereço] Logradouro",
            enderecoNumero: "[Endereço] Número",
            enderecoPais: "[Endereço] País"
        }];
    }

    return {
        getModalClienteCadastro: _getModalClienteCadastro,
        getEnderecoByCep: _getEnderecoByCep,
        getEstados: _getEstados,
        getExcelTemplate: _getExcelTemplate,
        capitalizeNome: _capitalizeNome,
        convertDataListToExcelJson: _convertDataListToExcelJson
    };
}