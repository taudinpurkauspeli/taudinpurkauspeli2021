module.exports = (sequelize, Sequelize) => {
  const SubProcedure = sequelize.define('subProcedure', {
    language: {
      type: Sequelize.STRING,
    },
    isDefault: {
      type: Sequelize.BOOLEAN,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'sub_procedures',
  });

  return SubProcedure;
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
