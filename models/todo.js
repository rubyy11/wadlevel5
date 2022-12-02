// models/todo.js
'use strict';
const {
  Model,Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      let a1=await this.overdue();
      
      var i=0;
      for(i;i<a1.length;i++){
        var s1=a1[i].displayableString()
        console.log(s1)
      }
      // FILL IN HERE
      console.log("\n");

      console.log("Due Today");
      let a2=await this.dueToday();
      
      var j=0;
      for(j;j<a2.length;j++){
        var s2=a2[j].displayableString()
        console.log(s2)
        //console.log(s2.length)
      }
      

      // FILL IN HERE
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      let a3=await this.dueLater();
      var z=0;
      for(z;z<a3.length;z++){
        var s3=a3[z].displayableString()
        console.log(s3)
      }

    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try{
        const l1=await Todo.findAll({
          where:{
            dueDate:{[Op.lt]:new Date()}
          }

        })
        return l1
      }
      catch(error){
        console.log(error);

      }
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try{
        const l2=await Todo.findAll({
          where:{
            dueDate:{[Op.eq]:new Date()}
          }

        })
        return l2
      }
      catch(error){
        console.log(error);

      }
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try{
        const l3=await Todo.findAll({
          where:{
            dueDate:{[Op.gt]:new Date()}
          }

        })
        return l3
      }
      catch(error){
        console.log(error);

      }
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update({
        completed:true

      },
      {
        where:{id:id}

      }
      )

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title}${this.dueDate === new Date().toLocaleDateString("en-CA") ? "":" "+this.dueDate }`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
  
};