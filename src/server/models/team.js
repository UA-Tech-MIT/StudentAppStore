export default (Conn, Sequelize) => {
    
const Team = Conn.define('team', { // relate through model
    owner: {
        type: Sequelize.UUID,
        // allowNull: false,
        // defaultValue: () => {
        //     return this.get
        // }
    }

});
    return Team;
}