import { ParseSourceFile } from "@angular/compiler";
import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Utilisateur } from "src/app/utils/models/utilisateur";
import { RegisterService } from "src/app/utils/services/register.service";

@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html",
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  newUser: Utilisateur;
  isCollapsed = true;
  focus: boolean;
  focusPrenom: boolean;
  focusNom: boolean;
  focusPhone: boolean;
  focusnomGp: boolean;
  focusPassword: boolean;
  focusPasswordv: boolean;
  submitted = false;
  isGp: boolean;
  passwordDiff: boolean;
  isfullForm: boolean;
  errPwlength: boolean;

  registerForm: FormGroup;
  userType: string;
  errNomGp: string;
  erroPw: string;

  // subscirptionData = {
  //   prenom: " ",
  //   nom: " ",
  //   email: " ",
  //   password: " ",
  //   telephone1: " ",
  //   telephone2: " ",
  //   nom_gp: " ",
  // };
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    //this.onMouseMove(event);
    // console.log(
    //   "les valeurs saisies :" + JSON.stringify(this.subscirptionData)
    // );

    this.registerForm = this.formBuilder.group({
      prenom: ["", Validators.required],
      nom: ["", Validators.required],
      nom_gp: ["", Validators.required],
      /**  phone: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^[0-9]*$"),
        ],
      ], */
      password: ["", [Validators.required, Validators.minLength(6)]],
      //   passwordc: ["", [Validators.required, Validators.minLength(6)]],
      // termsConditions: [Boolean, Validators.required],
      // userType: [this.userType, Validators.required],
      // nom_gp: ["", Validators.required],
      // telephone: [
      //   "",
      //   [
      //     Validators.required,
      //     Validators.minLength(10),
      //     Validators.maxLength(13),
      //   ],
      // ],
      // email: [
      //   "",
      //   [
      //     Validators.required,
      //     Validators.email,
      //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      //   ],
      // ],
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**RECUPERER LE TYPE DE USER GP OU CLIENT */
  onRadioChange(event: any) {
    this.isGp = false;
    this.userType = event.target.value;
    console.log("selected " + this.userType);
    if (this.userType == "gp") {
      this.isGp = true;
    }
  }

  /**BUTTON CONFIRMER */

  onSubmit() {
    this.submitted = true;
    // VERIFICATION DES 2 MOT DE PASSE
    /**  if (
      this.registerForm.value["password"] !=
      this.registerForm.value["passwordc"]
    ) {
      this.passwordDiff = true;
      this.isfullForm = false;
    }

    if (
      this.registerForm.value["password"] ==
      this.registerForm.value["passwordc"]
    ) {
      this.passwordDiff = false;
    }
    if (this.registerForm.valid && this.passwordDiff == false) {
      console.log(
        "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value)
      );
      // const body = {
      //   data: {
      //     username: this.registerForm.value["nomGp"],
      //     nom: this.registerForm.value["nom"],
      //     prenom: this.registerForm.value["prenom"],
      //     password: this.registerForm.value["phone"],
      //     telephone1: this.registerForm.value["password"],
      //   },
      // };
      this.registerService.createGp();
      this.registerForm;*/

    console.log("SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value));
    // this.newUser = {
    //   nom: "djiby",
    //   prenom: "diouf",
    //   password: this.registerForm.value["password"],
    //   nom_gp: "diouf gp",
    //   email: "ndiaye.djibyy@gmail.com",
    // };
    // this.registerService.createGp(this.newUser);
  }

  // ETAPE 4 MOT DE PASSE DIFF OU EGAL
  // let passW = this.registerForm.value["password"];
  // let passWlength = passW.length;
  // if (passWlength < 6) {
  //   this.errPwlength = true;
  //   this.isfullForm = false;
  // }

  // if (
  //   this.registerForm.value["password"] !=
  //   this.registerForm.value["passwordc"]
  // ) {
  //   this.passwordDiff = true;
  //   this.isfullForm = false;
  // }

  // if (
  //   this.registerForm.value["password"] ==
  //   this.registerForm.value["passwordc"]
  // ) {
  //   this.passwordDiff = false;
  //   this.isfullForm = false;
  // }

  // if (this.registerForm.invalid) {
  //   this.isfullForm = false;
  //   console.log("erreur dans le forrmulaire");
  // }

  //  FORMULAIRE OK
  // if (
  //   this.registerForm.value["prenom"] != "" &&
  //   this.registerForm.value["nom"] != "" &&
  //   this.registerForm.value["nomGp"] != "" &&
  //   this.registerForm.value["password"] ==
  //     this.registerForm.value["passwordc"]
  // ) {
  //   console.log(
  //     "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value)
  //   );
  // }

  // this.submitted = true;

  // this.registerForm.value == "";
  // }

  /** RECUPERATION FORMULAIRE D'INSCRIPTION */
  // onSubmit(): void {
  //   const body = {
  //     data: {
  //       nom: this.subscirptionData.nom,
  //       prenom: this.subscirptionData.prenom,
  //       email: this.subscirptionData.prenom,
  //       telephone1: this.subscirptionData.telephone1,
  //       telephone2: this.subscirptionData.telephone2,
  //       nom_gp: this.subscirptionData.nom_gp,
  //     },
  //   };
  // }
  /**__________________ANIMATION_____________________ */
  // @HostListener("document:mousemove", ["$event"])
  // onMouseMove(e) {
  //   var squares1 = document.getElementById("square1");
  //   var squares2 = document.getElementById("square2");
  //   var squares3 = document.getElementById("square3");
  //   var squares4 = document.getElementById("square4");
  //   var squares5 = document.getElementById("square5");
  //   var squares6 = document.getElementById("square6");
  //   var squares7 = document.getElementById("square7");
  //   var squares8 = document.getElementById("square8");

  //   var posX = e.clientX - window.innerWidth / 2;
  //   var posY = e.clientY - window.innerWidth / 6;

  //   squares1.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares2.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares3.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares4.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares5.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares6.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.05 +
  //     "deg) rotateX(" +
  //     posY * -0.05 +
  //     "deg)";
  //   squares7.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.02 +
  //     "deg) rotateX(" +
  //     posY * -0.02 +
  //     "deg)";
  //   squares8.style.transform =
  //     "perspective(500px) rotateY(" +
  //     posX * 0.02 +
  //     "deg) rotateX(" +
  //     posY * -0.02 +
  //     "deg)";
  // }
}
