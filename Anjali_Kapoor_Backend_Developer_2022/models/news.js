const {Sequelize} = require('sequelize');
module.exports = (sequelize,DataTypes)=>{
    const News = sequelize.define("news",{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        article: Sequelize.STRING,
        title: Sequelize.STRING,
        subtitle: Sequelize.STRING,
        author_name: Sequelize.STRING,
        description: Sequelize.STRING,
        read_status: {
            type:   Sequelize.ENUM,
            values: ['unread','read'],
            defaultValue: 'unread'
        },
        image: Sequelize.STRING,
        publish_date:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
          },
    },{
        timestamps: false,
    });
    return News;
}