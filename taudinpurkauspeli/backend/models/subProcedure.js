const db = require('../models');
const Procedure = db.procedures;


module.exports = (sequelize, Sequelize) => {
// In previous version this table was called "exercise"
  const subProcedures= sequelize.define('subProcedures', {
    procedureId: {
      type: Sequelize.INTEGER,
      references: {
        model: Procedure,
        key: 'id'
      }
    },
    priority: {
      type: Sequelize.INTEGER,
    },
  });

  return proceduresUnderCase;
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

    
    