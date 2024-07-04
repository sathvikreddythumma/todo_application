let taskInput=document.getElementById("taskInput");
let addBtn=document.getElementById("addBtn");
let todoList=document.getElementById("todoList");
let saveBtn=document.getElementById("saveBtn");
let editContainer=document.getElementById("editContainer");


function edit_item(todo,l_id){
    let edit_label=document.getElementById(l_id);
    let edit_todo=document.getElementById(todo);

    let holdDiv=document.createElement("div");

    let edit_head=document.createElement("h2");
    edit_head.classList.add("create-heading");

    let s1=document.createElement("span");
    s1.classList.add("create-heading");
    s1.style.fontWeight=700;
    s1.textContent="Edit ";

    let s2=document.createElement("span");
    s2.classList.add("create-heading");
    s2.textContent="Task";
    
    edit_head.appendChild(s1);
    edit_head.appendChild(s2);
    
    
    let edit_inp=document.createElement("input");
    edit_inp.classList.add("task-input");
    edit_inp.type="text";
    edit_inp.placeholder="edit here...";

    let rpl=edit_inp.value;
    console.log(rpl);

    let editButton=document.createElement("button");
    editButton.classList.add("button","mr-4");
    editButton.textContent="EDIT";

    let editBackButton=document.createElement("button");
    editBackButton.classList.add("button");
    editBackButton.textContent="BACK";

    editBackButton.onclick=function(){
        editContainer.removeChild(holdDiv);
    };

    editButton.onclick=function(){
        //edit_inp.value="";
        if(edit_inp.value===""){
            alert("Edit Properly");
            return ;
        }
        //console.log(todo,edit_label);
        let idx=add_todo_list.findIndex((each)=>{
            if(l_id==="labelId"+each.u_no){
                return true;
            }else{
                return false;
            }
        });
        let editRes=add_todo_list[idx];
        editRes.text=edit_inp.value;
        edit_label.textContent=edit_inp.value;
        edit_inp.value="";
        //console.log(editRes);
    };

    holdDiv.appendChild(edit_head);
    holdDiv.appendChild(edit_inp);
    holdDiv.appendChild(editButton);
    holdDiv.appendChild(editBackButton);
    editContainer.appendChild(holdDiv);
    //console.log(edit_label);
}

function delete_item(todo){
    let delete_item=document.getElementById(todo);
    //console.log(delete_item);
    todoList.removeChild(delete_item);
    
    let ind=add_todo_list.findIndex(function(each){
        //let id=todo;
        //console.log(id);
        if(todo===each.todo_id){
            return true;
        }
        else{
            return false;
        }
    });
    add_todo_list.splice(ind,1);
}

function decor(todo_id,check_id,l_id,item){
    //console.log(l_id);
    let check_box=document.getElementById(check_id);
    let label_element=document.getElementById(l_id);
    label_element.classList.toggle("line-through");
    //console.log(check_box,label_element);
    let status_index=add_todo_list.findIndex((each)=>{
        if(l_id==="labelId"+each.u_no)
            return true;
        else
            return false;
    });
    let s_ele=add_todo_list[status_index];
    if(s_ele.status===false){
        //label_element.classList.add("line-through");
        item.status=true;
    }
    else{
        //label_element.classList.remove("line-through");
        item.status=false;
    }
    console.log(s_ele);
}

function display(item){
    let todo_id="todoId"+item.u_no;
    let check_id="check"+item.u_no;
    let l_id="labelId"+item.u_no;
    //console.log(todo_id,check_id,l_id);

    let todo_element=document.createElement("li");
    todo_element.classList.add("mt-4","d-flex", "flex-row");
    todo_element.id=todo_id;
    todoList.appendChild(todo_element);

    let inp=document.createElement("input");
    inp.classList.add("checkbox-input");
    inp.type="checkbox";
    inp.id=check_id;
    inp.checked=item.status;
    todo_element.appendChild(inp);

    let div=document.createElement("div");
    div.classList.add("bg-item","d-flex","flex-row");
    let lab=document.createElement("label");
    //lab.setAttribute("for",item.todo_id);
    inp.onclick=function(){
        decor(todo_id,check_id,l_id,item);
    };

    if(item.status===true){
        lab.classList.add("line-through");
    }

    lab.htmlFor=check_id;
    lab.id=l_id;
    lab.textContent=item.text;

    let symbols_div=document.createElement("div");
    symbols_div.classList.add("seperate");

    let div_i1=document.createElement("div");
    let icon1=document.createElement("i");
    icon1.classList.add("fa-solid", "fa-pen-to-square", "pt-1");

    let div_i2=document.createElement("div");
    let icon2=document.createElement("i");
    icon2.classList.add("fa-solid", "fa-trash-can", "pt-1");
    //<i class="fa-solid fa-pen-to-square"></i>

    icon1.onclick=function(){
        edit_item(todo_id,l_id);
    };
    
    icon2.onclick=function(){
        delete_item(todo_id);
    };

    div_i1.appendChild(icon1);
    div_i2.appendChild(icon2);
    symbols_div.appendChild(div_i1);
    symbols_div.appendChild(div_i2);
    div.appendChild(lab);
    div.appendChild(symbols_div);
    todo_element.appendChild(div);
    todoList.appendChild(todo_element);

}

function get_data(){
    let from_storage=localStorage.getItem("todos");
    let parsing=JSON.parse(from_storage);
    if(parsing===null)
        return [];
    else
        return parsing;
}
let add_todo_list=get_data();
let count=add_todo_list.length;
console.log(add_todo_list);
for(let item of add_todo_list){
    console.log(item);
    display(item);
    }
//let res=localStorage.getItem("todos");
//console.log(JSON.parse(res));
//localStorage.removeItem("todos");
saveBtn.addEventListener("click",function(event){
    localStorage.setItem("todos",JSON.stringify(add_todo_list));
    //console.log(JSON.stringify(add_todo_list));
});

addBtn.addEventListener("click",function(event){
    count=count+1;
    let todo={
        u_no: count,
        text: taskInput.value,
        status: false,
    };
    if(taskInput.value===""){
        alert("Enter Valid Task!!!");
    }
    else{
    add_todo_list.push(todo);
    //individualTodo(add_todo_list);
    taskInput.value="";
    display(todo,count);}

});

