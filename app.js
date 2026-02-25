const TOTAL_STEPS = 8;
let currentStep = 0;
let simulatedMitId = false;
const cases = [];

const i18n = {
  en: {
    disclaimer:
      "Demo disclaimer: This experience is a demonstration only and does not constitute legal, regulatory, or compliance advice.",
    tabCustomer: "Business customer flow",
    tabCase: "Case handler dashboard",
    startTitle: "Commercial Due Diligence (CDD) onboarding",
    startIntro:
      "Complete the full Know Your Customer process for your business. You can start with simulated MitID or enter all data manually.",
    mitidLogin: "Log in with MitID (simulation)",
    manualStart: "Start manually",
    wizardTitle: "Business onboarding wizard",
    companyInfo: "1. Company information",
    companyName: "Registered company name",
    cvr: "CVR number (8 digits)",
    legalForm: "Legal form",
    industry: "Industry / NACE description",
    address: "Registered address",
    country: "Country of registration",
    purposeTitle: "2. Relationship purpose and expected activity",
    purpose: "Purpose of banking relationship",
    products: "Requested products/services",
    annualTurnover: "Expected annual turnover (DKK)",
    primaryGeographies: "Primary countries of operation",
    ownershipTitle: "3. Ownership and beneficial owners (UBO)",
    ownershipHint: "Add all natural persons owning 25% or more.",
    addUbo: "Add UBO",
    uboName: "UBO full name",
    uboOwnership: "Ownership (%)",
    uboCountry: "Country of residence",
    uboPep: "PEP status",
    remove: "Remove",
    managementTitle: "4. Management and signatories",
    ceoName: "CEO / primary contact",
    boardMembers: "Board members",
    signatories: "Authorized signatories",
    riskTitle: "5. Risk indicators",
    pepQuestion: "Any PEP linked to company/owners?",
    sanctionsQuestion: "Any sanctions exposure?",
    highRiskCountries: "Links to high-risk jurisdictions",
    eddReason: "Enhanced due diligence explanation (required when risk is flagged)",
    taxTitle: "6. Tax and reporting",
    taxResidency: "Tax residency countries",
    tin: "Tax identification number",
    fatca: "FATCA/US indicia present?",
    documentsTitle: "7. Documentation upload",
    registrationDoc: "Certificate of registration",
    ownershipDoc: "Ownership chart / register",
    financialDoc: "Latest financial statement",
    reviewTitle: "8. Review, declarations and submit",
    declarationText:
      "I declare that all information provided is complete and accurate.",
    consentText:
      "I consent to processing of personal and company data for onboarding assessment.",
    saveResume: "Save and resume later",
    prev: "Previous",
    next: "Next",
    submit: "Submit application",
    caseTitle: "Internal case handler dashboard",
    caseSubtitle: "Submitted demo applications for assessment.",
    tableCompany: "Company",
    tableCvr: "CVR",
    tableDate: "Submitted",
    tableRisk: "Risk level",
    tableStatus: "Status",
    mitidSuccess: "MitID simulation successful. Core company details have been pre-filled.",
    required: "Please complete all required fields in this step.",
    needUbo: "At least one UBO with ownership of 25% or more is required.",
    eddRequired: "Please provide enhanced due diligence explanation for flagged risk.",
    saved: "Progress has been saved in this browser.",
    submitted: "Application submitted successfully for internal assessment.",
    ready: "Ready for assessment",
    missing: "Missing information",
  },
  da: {
    disclaimer:
      "Demofraskrivelse: Denne løsning er kun til demonstration og udgør ikke juridisk, regulatorisk eller compliance-rådgivning.",
    tabCustomer: "Erhvervskundeflow",
    tabCase: "Sagsbehandleroverblik",
    startTitle: "Onboarding til Commercial Due Diligence (CDD)",
    startIntro:
      "Gennemfør hele Know Your Customer-processen for virksomheden. Start med simuleret MitID eller indtast data manuelt.",
    mitidLogin: "Log ind med MitID (simulation)",
    manualStart: "Start manuelt",
    wizardTitle: "Onboardingguide for virksomheder",
    companyInfo: "1. Virksomhedsoplysninger",
    companyName: "Registreret virksomhedsnavn",
    cvr: "CVR-nummer (8 cifre)",
    legalForm: "Selskabsform",
    industry: "Branche / NACE-beskrivelse",
    address: "Registreret adresse",
    country: "Registreringsland",
    purposeTitle: "2. Formål og forventet aktivitet",
    purpose: "Formål med bankforholdet",
    products: "Ønskede produkter/services",
    annualTurnover: "Forventet årlig omsætning (DKK)",
    primaryGeographies: "Primære lande for aktivitet",
    ownershipTitle: "3. Ejerforhold og reelle ejere (UBO)",
    ownershipHint: "Tilføj alle fysiske personer med ejerandel på 25% eller mere.",
    addUbo: "Tilføj UBO",
    uboName: "UBO fulde navn",
    uboOwnership: "Ejerandel (%)",
    uboCountry: "Bopælsland",
    uboPep: "PEP-status",
    remove: "Fjern",
    managementTitle: "4. Ledelse og tegningsberettigede",
    ceoName: "Direktør / primær kontakt",
    boardMembers: "Bestyrelsesmedlemmer",
    signatories: "Tegningsberettigede",
    riskTitle: "5. Risikoindikatorer",
    pepQuestion: "Er der PEP tilknytning til virksomhed/ejere?",
    sanctionsQuestion: "Er der sanktionsmæssig eksponering?",
    highRiskCountries: "Tilknytning til højrisikolande",
    eddReason: "Forklaring til skærpet kundekendskab (kræves ved risikoflag)",
    taxTitle: "6. Skat og rapportering",
    taxResidency: "Skattemæssige hjemlande",
    tin: "Skatteidentifikationsnummer",
    fatca: "FATCA/US-indicia til stede?",
    documentsTitle: "7. Upload dokumentation",
    registrationDoc: "Registreringsbevis",
    ownershipDoc: "Ejerdiagram / ejerregister",
    financialDoc: "Seneste regnskab",
    reviewTitle: "8. Gennemgang, erklæring og indsend",
    declarationText:
      "Jeg erklærer, at alle oplysninger er fuldstændige og korrekte.",
    consentText:
      "Jeg samtykker til behandling af person- og virksomhedsdata til onboardingvurdering.",
    saveResume: "Gem og fortsæt senere",
    prev: "Tilbage",
    next: "Næste",
    submit: "Indsend ansøgning",
    caseTitle: "Internt overblik for sagsbehandlere",
    caseSubtitle: "Indsendte demoansøgninger til vurdering.",
    tableCompany: "Virksomhed",
    tableCvr: "CVR",
    tableDate: "Indsendt",
    tableRisk: "Risikoniveau",
    tableStatus: "Status",
    mitidSuccess: "MitID-simulation gennemført. Centrale virksomhedsoplysninger er udfyldt.",
    required: "Udfyld alle obligatoriske felter i dette trin.",
    needUbo: "Mindst én UBO med ejerandel på 25% eller mere er påkrævet.",
    eddRequired: "Angiv forklaring til skærpet kundekendskab for risikoflag.",
    saved: "Fremdrift er gemt i denne browser.",
    submitted: "Ansøgning er indsendt til intern vurdering.",
    ready: "Klar til vurdering",
    missing: "Manglende information",
  },
};

const el = {
  languageSelect: document.getElementById("languageSelect"),
  tabs: document.querySelectorAll(".tab"),
  customerView: document.getElementById("customerView"),
  caseHandlerView: document.getElementById("caseHandlerView"),
  mitidBtn: document.getElementById("mitidBtn"),
  startManualBtn: document.getElementById("startManualBtn"),
  mitidStatus: document.getElementById("mitidStatus"),
  wizardCard: document.getElementById("wizardCard"),
  form: document.getElementById("cddForm"),
  steps: document.querySelectorAll(".step"),
  progressText: document.getElementById("progressText"),
  progressBar: document.getElementById("progressBar"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  submitBtn: document.getElementById("submitBtn"),
  saveBtn: document.getElementById("saveBtn"),
  addUbo: document.getElementById("addUbo"),
  uboContainer: document.getElementById("uboContainer"),
  uboTemplate: document.getElementById("uboTemplate"),
  reviewSummary: document.getElementById("reviewSummary"),
  casesTbody: document.getElementById("casesTbody"),
  enhancedDueDiligenceWrap: document.getElementById("enhancedDueDiligenceWrap"),
};

function t(key) {
  return i18n[el.languageSelect.value][key] || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  renderCases();
  refreshStepUI();
}

function showTab(tab) {
  el.tabs.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === tab));
  el.customerView.classList.toggle("hidden", tab !== "customer");
  el.caseHandlerView.classList.toggle("hidden", tab !== "caseHandler");
}

function addUbo(prefill = {}) {
  const instance = el.uboTemplate.content.firstElementChild.cloneNode(true);
  instance.querySelector('[name="uboName"]').value = prefill.uboName || "";
  instance.querySelector('[name="uboOwnership"]').value = prefill.uboOwnership || "";
  instance.querySelector('[name="uboCountry"]').value = prefill.uboCountry || "";
  instance.querySelector('[name="uboPep"]').value = prefill.uboPep || "";
  instance.querySelector(".remove-ubo").addEventListener("click", () => instance.remove());
  el.uboContainer.appendChild(instance);
  applyTranslations();
}

function startFlow() {
  el.wizardCard.classList.remove("hidden");
}

function simulateMitId() {
  simulatedMitId = true;
  startFlow();
  const preset = {
    companyName: "Nordic Green Solutions ApS",
    cvr: "41589273",
    legalForm: "ApS",
    industry: "Sustainable wholesale trade",
    address: "Købmagergade 12, 1150 København",
    country: "Denmark",
    ceoName: "Mette Jensen",
    taxResidency: "Denmark",
    tin: "DK-99887766",
  };

  Object.entries(preset).forEach(([name, value]) => {
    const input = el.form.elements[name];
    if (input) input.value = value;
  });

  if (!el.uboContainer.children.length) {
    addUbo({
      uboName: "Mette Jensen",
      uboOwnership: "60",
      uboCountry: "Denmark",
      uboPep: "no",
    });
  }

  el.mitidStatus.textContent = t("mitidSuccess");
  refreshStepUI();
}

function setStep(target) {
  currentStep = Math.max(0, Math.min(TOTAL_STEPS - 1, target));
  refreshStepUI();
}

function refreshStepUI() {
  el.steps.forEach((step, idx) => step.classList.toggle("hidden", idx !== currentStep));
  el.progressText.textContent = `${currentStep + 1}/${TOTAL_STEPS}`;
  el.progressBar.style.width = `${((currentStep + 1) / TOTAL_STEPS) * 100}%`;
  el.prevBtn.disabled = currentStep === 0;
  el.nextBtn.classList.toggle("hidden", currentStep === TOTAL_STEPS - 1);
  el.submitBtn.classList.toggle("hidden", currentStep !== TOTAL_STEPS - 1);
  toggleEnhancedDueDiligence();
  renderReview();
}

function invalidate(node) {
  node.classList.add("invalid");
}

function clearInvalid(scope) {
  scope.querySelectorAll(".invalid").forEach((n) => n.classList.remove("invalid"));
}

function validateStep() {
  const step = el.steps[currentStep];
  clearInvalid(step);
  let valid = true;

  const requiredNodes = step.querySelectorAll("input[required], select[required], textarea[required]");
  requiredNodes.forEach((node) => {
    if (node.type === "file") {
      if (!node.files || node.files.length === 0) {
        invalidate(node);
        valid = false;
      }
      return;
    }
    if (!node.checkValidity()) {
      invalidate(node);
      valid = false;
    }
  });

  if (currentStep === 2) {
    const entries = [...el.uboContainer.querySelectorAll(".ubo-entry")];
    if (entries.length === 0) {
      alert(t("needUbo"));
      return false;
    }
    entries.forEach((entry) => {
      entry.querySelectorAll("input, select").forEach((node) => {
        if (!node.checkValidity()) {
          invalidate(node);
          valid = false;
        }
      });
    });
  }

  if (currentStep === 4 && el.enhancedDueDiligenceWrap.classList.contains("hidden") === false) {
    const eddField = el.form.elements.eddReason;
    if (!eddField.value || eddField.value.trim().length < 25) {
      invalidate(eddField);
      alert(t("eddRequired"));
      valid = false;
    }
  }

  if (!valid) alert(t("required"));
  return valid;
}

function toggleEnhancedDueDiligence() {
  const pep = el.form.elements.pep.value;
  const sanctions = el.form.elements.sanctions.value;
  const highRisk = el.form.elements.highRiskCountries.value.trim();
  const flagged = pep === "yes" || sanctions === "yes" || highRisk.length > 0;
  el.enhancedDueDiligenceWrap.classList.toggle("hidden", !flagged);
  el.form.elements.eddReason.required = flagged;
}

function formToObject() {
  const data = {};
  Array.from(el.form.elements).forEach((node) => {
    if (!node.name || node.type === "button") return;
    if (node.type === "file") {
      data[node.name] = node.files?.[0]?.name || "";
    } else if (node.type === "checkbox") {
      data[node.name] = node.checked;
    } else {
      data[node.name] = node.value;
    }
  });
  data.ubos = [...el.uboContainer.querySelectorAll(".ubo-entry")].map((entry) => ({
    name: entry.querySelector('[name="uboName"]').value,
    ownership: entry.querySelector('[name="uboOwnership"]').value,
    country: entry.querySelector('[name="uboCountry"]').value,
    pep: entry.querySelector('[name="uboPep"]').value,
  }));
  data.simulatedMitId = simulatedMitId;
  return data;
}

function renderReview() {
  if (currentStep !== TOTAL_STEPS - 1) return;
  const d = formToObject();
  const riskLevel =
    d.pep === "yes" || d.sanctions === "yes" || (d.highRiskCountries || "").trim()
      ? "High"
      : "Standard";

  el.reviewSummary.innerHTML = `
    <div class="card soft">
      <strong>${d.companyName || "-"}</strong><br>
      CVR: ${d.cvr || "-"}<br>
      UBOs: ${d.ubos.length}<br>
      Risk: ${riskLevel}<br>
      MitID simulated: ${d.simulatedMitId ? "Yes" : "No"}
    </div>
  `;
}

function saveProgress() {
  const payload = {
    currentStep,
    simulatedMitId,
    data: formToObject(),
  };
  localStorage.setItem("cddDemoProgress", JSON.stringify(payload));
  alert(t("saved"));
}

function loadProgress() {
  const raw = localStorage.getItem("cddDemoProgress");
  if (!raw) {
    addUbo();
    return;
  }

  try {
    const payload = JSON.parse(raw);
    simulatedMitId = Boolean(payload.simulatedMitId);
    const data = payload.data || {};
    startFlow();

    Object.entries(data).forEach(([name, value]) => {
      const node = el.form.elements[name];
      if (!node || ["ubos", "simulatedMitId"].includes(name)) return;
      if (node.type === "checkbox") node.checked = Boolean(value);
      else if (node.type !== "file") node.value = value;
    });

    el.uboContainer.innerHTML = "";
    if (Array.isArray(data.ubos) && data.ubos.length) {
      data.ubos.forEach((ubo) =>
        addUbo({
          uboName: ubo.name,
          uboOwnership: ubo.ownership,
          uboCountry: ubo.country,
          uboPep: ubo.pep,
        })
      );
    } else {
      addUbo();
    }

    setStep(Number(payload.currentStep) || 0);
  } catch {
    addUbo();
  }
}

function renderCases() {
  el.casesTbody.innerHTML = "";
  if (!cases.length) {
    el.casesTbody.innerHTML = `<tr><td colspan="5">-</td></tr>`;
    return;
  }

  cases.forEach((c) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.companyName}</td>
      <td>${c.cvr}</td>
      <td>${c.submittedAt}</td>
      <td>${c.risk}</td>
      <td><span class="status-pill ${c.statusClass}">${c.statusText}</span></td>
    `;
    el.casesTbody.appendChild(row);
  });
}

function submitApplication(event) {
  event.preventDefault();
  if (!validateStep()) return;
  const d = formToObject();
  const flagged = d.pep === "yes" || d.sanctions === "yes" || d.highRiskCountries.trim();
  cases.unshift({
    companyName: d.companyName,
    cvr: d.cvr,
    submittedAt: new Date().toLocaleString(el.languageSelect.value === "da" ? "da-DK" : "en-GB"),
    risk: flagged ? "High" : "Standard",
    statusText: flagged ? t("missing") : t("ready"),
    statusClass: flagged ? "missing" : "ready",
  });
  localStorage.removeItem("cddDemoProgress");
  alert(t("submitted"));
  renderCases();
  el.form.reset();
  el.uboContainer.innerHTML = "";
  addUbo();
  simulatedMitId = false;
  setStep(0);
}

el.languageSelect.addEventListener("change", applyTranslations);
el.tabs.forEach((btn) => btn.addEventListener("click", () => showTab(btn.dataset.tab)));
el.mitidBtn.addEventListener("click", simulateMitId);
el.startManualBtn.addEventListener("click", startFlow);
el.addUbo.addEventListener("click", () => addUbo());
el.prevBtn.addEventListener("click", () => setStep(currentStep - 1));
el.nextBtn.addEventListener("click", () => {
  if (validateStep()) setStep(currentStep + 1);
});
el.saveBtn.addEventListener("click", saveProgress);
el.form.addEventListener("submit", submitApplication);
el.form.elements.pep.addEventListener("change", toggleEnhancedDueDiligence);
el.form.elements.sanctions.addEventListener("change", toggleEnhancedDueDiligence);
el.form.elements.highRiskCountries.addEventListener("input", toggleEnhancedDueDiligence);

loadProgress();
applyTranslations();
refreshStepUI();
