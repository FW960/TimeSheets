let token = "";
let refreshToken = "";

getCookies();

let authorizedTwoTimes = false;

$(".form-auth-wrapper").attr("style", "display:none");

$(".company-add-button").click(async function e()
{
    let companyInnInput = $(".companyInnInputAdd ").val();
    let companyNameInput = $(".companyNameInputAdd").val();

    let resp = fetch("https://localhost:7292/company/add", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            Name: companyNameInput, Inn: companyInnInput
        })
    })

    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        getNewToken();
        resp = fetch("https://localhost:7292/company/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                Name: companyNameInput, Inn: companyInnInput
            })
        })
    }

    let companyTextArea = $(".companieOutputText");

    if (resp.status == 200)
        companyTextArea.val(`Company ${companyInnInput} added`);
})

$(".company-get-button").click(async function e()
{
    let companyInnInput = $(".companyInnInputGet").val();

    let resp = await fetch(`https://localhost:7292/company/get/by/inn=${companyInnInput}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })

    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        getNewToken();

        resp = await fetch(`https://localhost:7292/company/get/by/inn=${companyInnInput}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    }

    if (resp.status == 200)
    {

        let companyDto = await resp.json();

        let companyTextArea = $(".companieOutputText");

        let text = "";

        for (const key in companyDto)
        {
            if (key == "ceo")
            {
                for (let ceoKey in companyDto[key])
                {
                    text += `${ceoKey} - ${companyDto[key][ceoKey]}` + "\n";
                }
                continue;
            }

            text += `${key} - ${companyDto[key]}` + "\n";
        }

        companyTextArea.val(text);
    }
})
$(".company-update-button").click(async function e()
{
    let companyInnInput = $(".companyInnInputUpdate").val();
    let companyNameInput = $(".companyNameInputUpdate").val();
    let companyCeoInput = $(".companyCeoInputUpdate").val();

    let resp = await fetch(`https://localhost:7292/company/update/new-ceo/id=${companyCeoInput}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            Name: companyNameInput, Inn: companyInnInput
        })
    })

    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        getNewToken();

        resp = await fetch(`https://localhost:7292/company/update/new-ceo/id=${companyCeoInput}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                Name: companyNameInput, Inn: companyInnInput
            })
        })
    }

    let companyTextArea = $(".companieOutputText");

    if (resp.status == 200)
        companyTextArea.val(`Company ${companyInnInput} updated`);

})

$(".company-delete-button").click(async function e()
{
    let companyInnInput = $(".companyInnInputDelete").val();

    let resp = await fetch(`https://localhost:7292/company/delete/by/inn=${companyInnInput}`, {
        method: "DELETE"
    })

    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        getNewToken();

        resp = await fetch(`https://localhost:7292/company/delete/by/inn=${companyInnInput}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

    }

    let companyTextArea = $(".companieOutputText");

    if (resp.status = 200)
        companyTextArea.val(`Company ${companyInnInput} updated`);
})

function authorizeAgain()
{
    $(".form-auth-wrapper").attr("style", "display:block");

    $(".formsWrapper").addClass("hide");

    document.querySelector(".form-auth-wrapper").style.height = document.body.offsetHeight + 20;

    $(".sub-but").click(getNewToken)

}

$(".customers-add-button").click(async function e()
{
    let customerPostInputAdd = $(".customerPostInputAdd").val();
    let customerCompanyInnInputAdd = $(".customerCompanyInnInputAdd").val();
    let customerEmailInputAdd = $(".customerEmailInputAdd").val();
    let customerFirstNameInputAdd = $(".customerFirstNameInputAdd").val();
    let customerLastnameInputAdd = $(".customerLastnameInputAdd").val();

    let resp = await fetch("https://localhost:7292/customers/add/agent", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                FirstName: customerFirstNameInputAdd,
                LastName: customerLastnameInputAdd,
                CompanyInn: customerCompanyInnInputAdd,
                Post: customerPostInputAdd,
                Email: customerEmailInputAdd
            })
    })
    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        getNewToken();

        resp = await fetch("https://localhost:7292/customers/add/agent", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    FirstName: customerFirstNameInputAdd,
                    LastName: customerLastnameInputAdd,
                    CompanyInn: customerCompanyInnInputAdd,
                    Post: customerPostInputAdd,
                    Email: customerEmailInputAdd
                })
        })
    }

    let customersOutputText = $(".customersOutputText");

    if (resp.ok)
    {
        customersOutputText.val("Customer added");
    }

})

$(".customer-get-by-id-button").click(async function e()
{
    let customerInputGetById = $(".customerInputGetById").val();

    let resp = await fetch(`https://localhost:7292/customers/get/by_id/agent/id=${customerInputGetById}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        getNewToken();

        resp = await fetch(`https://localhost:7292/customers/get/by_id/agent/id=${customerInputGetById}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }


    if (resp.ok)
    {
        let customersOutputText = $(".customersOutputText");
        let text = "";

        let customerDto = await resp.json();

        for (const key in customerDto)
        {
            text += `${key} ${customerDto[key]} \n`;
        }

        customersOutputText.val(text);
    }
})

document.querySelector(".customers-get-by-name-button").addEventListener("click", async function e()
{

    let firstName = parseInt(document.querySelector(".customerFirstNameInputGetByName").value);

    let lastName = parseInt(document.querySelector(".customerLastnameInputGetByName").value);

    let resp = await fetch(`https://localhost:7292/customers/get/by_full_name/agent/first_name=${firstName}/last_name=${lastName}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        getNewToken();

        resp = await fetch(`https://localhost:7292/customers/get/by_full_name/agent/first_name=${firstName}/last_name=${lastName}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    if (resp.ok)
    {
        let customerDto = await resp.json();

        let text = "";

        for (const key in customerDto)
        {
            text += `${key} ${customerDto[key]} \n`;
        }

        document.querySelector(".customersOutputText").textContent = text;
    }
})

document.querySelector(".customers-get-by-id-range-button").addEventListener("click", async function e()
{
    let customerStartIdInputFindRage = document.querySelector(".customerStartIdInputFindRage").value;

    let customerEndIdInputFindRage = document.querySelector(".customerEndIdInputFindRage").value;

    let resp = await fetch(`https://localhost:7292/customers/get/range/agents/skip_from=${customerStartIdInputFindRage}&take_until=${customerEndIdInputFindRage}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        getNewToken();

        resp = await fetch(`https://localhost:7292/customers/get/range/agents/skip_from=${customerStartIdInputFindRage}&take_until=${customerEndIdInputFindRage}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

    }

    if (resp.ok)
    {
        let customers = await resp.json();

        let outputText = document.querySelector(".customersOutputText");

        let text = "";

        customers.forEach(customer =>
        {
            for (const key in customer)
            {
                text += `${key} ${customer[key]}\n`
            }
            text += "\n";
        });

        outputText.textContent = text;
    }
})

document.querySelector(".customers-update-button").addEventListener("click", async function e()
{
    let customerIdInputUpdate = document.querySelector(".customerIdInputUpdate").value;

    let customerFirstNameInputUpdate = document.querySelector(".customerFirstNameInputUpdate").value;

    let customerLastnameInputUpdate = document.querySelector(".customerLastnameInputUpdate").value;

    let customerEmailInputUpdate = document.querySelector(".customerEmailInputUpdate").value;

    let customerCompanyInnInputUpdate = document.querySelector(".customerCompanyInnInputUpdate").value;

    let customerPostInputUpdate = document.querySelector(".customerPostInputUpdate").value;

    let resp = await fetch(`https://localhost:7292/customers/update/agent/id=${customerIdInputUpdate}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },

        body: JSON.stringify(
            {
                FirstName: customerFirstNameInputUpdate,
                LastName: customerLastnameInputUpdate,
                CompanyInn: customerCompanyInnInputUpdate,
                Post: customerPostInputUpdate,
                Email: customerEmailInputUpdate
            })
    }
    )

    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        getNewToken();

        resp = await fetch(`https://localhost:7292/customers/update/agent/id=${customerIdInputUpdate}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    FirstName: customerFirstNameInputUpdate,
                    LastName: customerLastnameInputUpdate,
                    Email: customerEmailInputUpdate,
                    CompanyInn: customerCompanyInnInputUpdate,
                    Post: customerPostInputUpdate
                })
        }
        )
    }

    if (resp.ok)
    {
        document.querySelector(".customersOutputText").textContent = "Customer updated";
    }
})

document.querySelector(".customers-delete-button").addEventListener("click", async function e()
{
    let customersIdInputDelete = document.querySelector(".customersIdInputDelete").value;

    let resp = await fetch(`https://localhost:7292/customers/delete/agent/id=${customersIdInputDelete}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (resp.status == 401 && !authorizedTwoTimes)
    {
        authorizeAgain();
        return;
    } else if (resp.status == 401)
    {
        resp = await fetch(`https://localhost:7292/customers/delete/agent/id=${customersIdInputDelete}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    if (resp.ok)
    {
        document.querySelector(".customersOutputText").textContent = "Customer deleted";
    }
})

async function getNewToken()
{
    let resp = await fetch("https://localhost:7292/admin/person/manage/authorized.html", {
        method: "GET",
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "RefreshToken": refreshToken,
        }
    })

    if (resp.ok)
    {
        getCookies();

        if (!authorizedTwoTimes)
        {
            document.querySelector(".form-auth-wrapper").remove();
            document.querySelector(".formsWrapper").classList.remove("hide");

        }

        authorizedTwoTimes = true;
    }
}

function getCookies()
{
    let cookies = document.cookie.split(";")

    for (let i = 0; i < cookies.length; i++)
    {
        if (cookies[i].includes("RefreshToken="))
        {
            refreshToken = cookies[i].split("RefreshToken=")[1];
            continue;
        } else if (cookies[i].includes("Token"))
        {
            token = cookies[i].split("Token=")[1];
        }
    }

}