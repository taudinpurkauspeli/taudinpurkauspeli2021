const db = require('../models');

module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const subProcedures= sequelize.define('subProcedures', {
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'sub_procedures',
  });

  return subProcedures;
};




/* Subtask
    ProcedureID
    SubtaskID
    Taso
    Tyyppi

--Teksti
    SubtaskID
    Nimi
    Teksti
    

--Kysymys
    SubtaskID
    KysymysID
    Nimi
    Radio/ei
    

Kysymysten vaihtoehdot
    KysymysID
    VaihtoehtopankkiID
    Oikeus
    Tekstiselite


--Pohdinta
    SubtaskID
    PohdintaID
    Nimi


Pohdinta vaihtoehdot
    PohdintaID
    VaihtoehtopankkiID
    Oikeus
    Tekstiselite

--Diagnoosi
    SubtaskID
    TautipankkiID (oikeatauti)

Vaihtoehtopankki
    ID
    Vaihtoehto/nimi
 */

    
    