import React from "react";

export default function Galerie() {
  //   const AddParcours = async () => {
  //     if (
  //       nomParcours === "" ||
  //       dureeParcours === "" ||
  //       prix === "" ||
  //       niveauDifficulte === "" ||
  //       descriptionParcours === ""
  //     ) {
  //       alert("Veuillez remplir tous les champs");
  //     } else {
  //       let data = {
  //         nomParcours: nomParcours,
  //         dureeParcours: dureeParcours,
  //         description: descriptionParcours,
  //         prix: prix,
  //         niveauDifficulte: niveauDifficulte,
  //       };
  //       const body = JSON.stringify(data);
  //       let options = {
  //         method: "POST",
  //         headers: headers,
  //         body: body,
  //       };
  //       let reponse = await fetch(
  //         "http://127.0.0.1:8080/parcours/createParcours",
  //         options
  //       );
  //       let donnes = await reponse.json();
  //       if (donnes) {
  //         const id = donnes._id;
  //         if (image.data) {
  //           const formData = new FormData();
  //           formData.append("file", image.data);
  //           let options = {
  //             method: "POST",
  //             // headers : headers,
  //             headers: {
  //               Authorization: "bearer " + token,
  //               // "Content-Type": "multipart/form-data boundary=something",
  //             },
  //             body: formData,
  //           };
  //           const response = await fetch(
  //             `http://127.0.0.1:8080/parcours/createImageParcours/${id}`,
  //             options
  //           );
  //           let result = await response.json();
  //           const res = JSON.stringify(result);
  //           if (res !== '{"message":"Echec"}') {
  //             setImage([]);
  //           }
  //         }
  //       }
  //       alert(`Parcours ${nomParcours} créé`);
  //       setNomParcours("");
  //       setDescriptionParcours("");
  //       setNiveauDifficulte("");
  //       setPrix("");
  //       setDureeParcours("");
  //       setIsOpen(false);
  //       setRefresh(!refresh);
  //     }
  //   };
  return (
    <div>
      <div className="titrePhotoGalerie">
        <input
          type="text"
          id="titrePhotoGalerie"
          placeholder="Titre photo"
          //   value={nomParcours}
          //   onChange={(e) => setNomParcours(e.target.value)}
        />
      </div>
      <div className="Description">
        <textarea
          type="text"
          id="descriptionm"
          placeholder="Description"
          //   value={descriptionParcours}
          //   onChange={(e) => setDescriptionParcours(e.target.value)}
        />
      </div>
    </div>
  );
}
