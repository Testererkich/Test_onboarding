const TOTAL_STEPS = 8;
const CASE_STAGES = ["received", "initial", "edd", "qa", "decision"];

let currentStep = 0;
let simulatedMitId = false;
let selectedCaseId = null;
let nextCaseId = 1;
const cases = [];

const i18n = {
  en: {
    disclaimer: "Demo disclaimer: This experience is a demonstration only and does not constitute legal, regulatory, or compliance advice.",
    tabCustomer: "Business customer flow", tabCase: "Case handler dashboard", startTitle: "Commercial Due Diligence (CDD) onboarding",
    startIntro: "Complete the full Know Your Customer process for your business. You can start with simulated MitID or enter all data manually.",
    mitidLogin: "Log in with MitID (simulation)", manualStart: "Start manually", wizardTitle: "Business onboarding wizard",
    companyInfo: "1. Company information", companyName: "Registered company name", cvr: "CVR number (8 digits)", legalForm: "Legal form", industry: "Industry / NACE description", address: "Registered address", country: "Country of registration",
    purposeTitle: "2. Relationship purpose and expected activity", purpose: "Purpose of banking relationship", products: "Requested products/services", annualTurnover: "Expected annual turnover (DKK)", primaryGeographies: "Primary countries of operation",
    ownershipTitle: "3. Ownership and beneficial owners (UBO)", ownershipHint: "Add all natural persons owning 25% or more.", addUbo: "Add UBO", uboName: "UBO full name", uboOwnership: "Ownership (%)", uboCountry: "Country of residence", uboPep: "PEP status", remove: "Remove",
    managementTitle: "4. Management and signatories", ceoName: "CEO / primary contact", boardMembers: "Board members", signatories: "Authorized signatories",
    riskTitle: "5. Risk indicators", pepQuestion: "Any PEP linked to company/owners?", sanctionsQuestion: "Any sanctions exposure?", highRiskCountries: "Links to high-risk jurisdictions", eddReason: "Enhanced due diligence explanation (required when risk is flagged)",
    taxTitle: "6. Tax and reporting", taxResidency: "Tax residency countries", tin: "Tax identification number", fatca: "FATCA/US indicia present?",
    documentsTitle: "7. Documentation upload", registrationDoc: "Certificate of registration", ownershipDoc: "Ownership chart / register", financialDoc: "Latest financial statement",
    reviewTitle: "8. Review, declarations and submit", declarationText: "I declare that all information provided is complete and accurate.", consentText: "I consent to processing of personal and company data for onboarding assessment.",
    saveResume: "Save and resume later", prev: "Previous", next: "Next", submit: "Submit application",
    roleLabel: "Active role", roleAnalyst: "Analyst", roleCompliance: "Compliance", roleManager: "Manager",
    queueLabel: "Queue", queueTeam: "Team queue", queueMine: "My queue", queueOverdue: "Overdue", queueEscalated: "Escalated",
    caseTitle: "Internal case handler dashboard", caseSubtitle: "Submitted demo applications for assessment.",
    tableCompany: "Company", tableCvr: "CVR", tableDate: "Submitted", tableRisk: "Risk", tableSla: "SLA", tableStatus: "Status", tableActions: "Actions", openCase: "Open",
    workbenchTitle: "Case processing workbench", handlerNotes: "Case handler notes", checkIdentity: "Identity verified", checkOwnership: "Ownership and UBO validated", checkRisk: "Risk and sanctions reviewed", checkDocs: "Documentation complete",
    rfiTitle: "Request information loop", rfiQuestion: "Question to customer", rfiResponse: "Customer response", sendRfi: "Send RFI", resolveRfi: "Resolve RFI",
    decisionLabel: "Case decision", decisionReady: "Ready for assessment", decisionMissing: "Missing information", decisionEscalate: "Escalate to compliance", decisionApproved: "Approve onboarding", decisionRejected: "Reject onboarding",
    dualControlTitle: "Four-eyes control", secondaryReviewer: "Secondary reviewer", fourEyesConfirmed: "Second reviewer approval confirmed",
    saveCaseWork: "Save work", moveNextStage: "Move to next stage", auditTitle: "Audit trail",
    stage_received: "Received", stage_initial: "Initial review", stage_edd: "EDD review", stage_qa: "QA check", stage_decision: "Decision",
    mitidSuccess: "MitID simulation successful. Core company details have been pre-filled.", required: "Please complete all required fields in this step.", needUbo: "At least one UBO with ownership of 25% or more is required.", eddRequired: "Please provide enhanced due diligence explanation for flagged risk.", saved: "Progress has been saved in this browser.", submitted: "Application submitted successfully for internal assessment.",
    ready: "Ready", missing: "Missing", escalated: "Escalated", approved: "Approved", rejected: "Rejected",
    caseSaved: "Case work saved.", selectCaseFirst: "Select a case first.", stageMoved: "Case moved to next stage.", cannotMoveFinal: "Case is already in the final stage.", completionRequired: "For approve/reject you need completed checklist, notes, and four-eyes confirmation.",
    permissionDenied: "Current role is not permitted for this decision.", rfiSent: "RFI sent to customer.", rfiResolved: "RFI resolved.",
    riskScore: "Risk score", riskModel: "Model", riskStandard: "Standard", riskMedium: "Medium", riskHigh: "High", overdue: "Overdue"
  },
  da: {
    disclaimer: "Demofraskrivelse: Denne løsning er kun til demonstration og udgør ikke juridisk, regulatorisk eller compliance-rådgivning.",
    tabCustomer: "Erhvervskundeflow", tabCase: "Sagsbehandleroverblik", startTitle: "Onboarding til Commercial Due Diligence (CDD)",
    startIntro: "Gennemfør hele Know Your Customer-processen for virksomheden. Start med simuleret MitID eller indtast data manuelt.",
    mitidLogin: "Log ind med MitID (simulation)", manualStart: "Start manuelt", wizardTitle: "Onboardingguide for virksomheder",
    companyInfo: "1. Virksomhedsoplysninger", companyName: "Registreret virksomhedsnavn", cvr: "CVR-nummer (8 cifre)", legalForm: "Selskabsform", industry: "Branche / NACE-beskrivelse", address: "Registreret adresse", country: "Registreringsland",
    purposeTitle: "2. Formål og forventet aktivitet", purpose: "Formål med bankforholdet", products: "Ønskede produkter/services", annualTurnover: "Forventet årlig omsætning (DKK)", primaryGeographies: "Primære lande for aktivitet",
    ownershipTitle: "3. Ejerforhold og reelle ejere (UBO)", ownershipHint: "Tilføj alle fysiske personer med ejerandel på 25% eller mere.", addUbo: "Tilføj UBO", uboName: "UBO fulde navn", uboOwnership: "Ejerandel (%)", uboCountry: "Bopælsland", uboPep: "PEP-status", remove: "Fjern",
    managementTitle: "4. Ledelse og tegningsberettigede", ceoName: "Direktør / primær kontakt", boardMembers: "Bestyrelsesmedlemmer", signatories: "Tegningsberettigede",
    riskTitle: "5. Risikoindikatorer", pepQuestion: "Er der PEP-tilknytning til virksomhed/ejere?", sanctionsQuestion: "Er der sanktionsmæssig eksponering?", highRiskCountries: "Tilknytning til højrisikolande", eddReason: "Forklaring til skærpet kundekendskab (kræves ved risikoflag)",
    taxTitle: "6. Skat og rapportering", taxResidency: "Skattemæssige hjemlande", tin: "Skatteidentifikationsnummer", fatca: "FATCA/US-indicia til stede?",
    documentsTitle: "7. Upload dokumentation", registrationDoc: "Registreringsbevis", ownershipDoc: "Ejerdiagram / ejerregister", financialDoc: "Seneste regnskab",
    reviewTitle: "8. Gennemgang, erklæring og indsend", declarationText: "Jeg erklærer, at alle oplysninger er fuldstændige og korrekte.", consentText: "Jeg samtykker til behandling af person- og virksomhedsdata til onboardingvurdering.",
    saveResume: "Gem og fortsæt senere", prev: "Tilbage", next: "Næste", submit: "Indsend ansøgning",
    roleLabel: "Aktiv rolle", roleAnalyst: "Analytiker", roleCompliance: "Compliance", roleManager: "Manager",
    queueLabel: "Kø", queueTeam: "Teamkø", queueMine: "Min kø", queueOverdue: "Forfaldne", queueEscalated: "Eskalerede",
    caseTitle: "Internt overblik for sagsbehandlere", caseSubtitle: "Indsendte demoansøgninger til vurdering.",
    tableCompany: "Virksomhed", tableCvr: "CVR", tableDate: "Indsendt", tableRisk: "Risiko", tableSla: "SLA", tableStatus: "Status", tableActions: "Handling", openCase: "Åbn",
    workbenchTitle: "Sagsbehandler-workbench", handlerNotes: "Sagsnoter", checkIdentity: "Identitet verificeret", checkOwnership: "Ejerforhold og UBO valideret", checkRisk: "Risiko og sanktioner gennemgået", checkDocs: "Dokumentation komplet",
    rfiTitle: "Informationsloop", rfiQuestion: "Spørgsmål til kunden", rfiResponse: "Svar fra kunden", sendRfi: "Send forespørgsel", resolveRfi: "Luk forespørgsel",
    decisionLabel: "Sagsbeslutning", decisionReady: "Klar til vurdering", decisionMissing: "Manglende information", decisionEscalate: "Eskaler til compliance", decisionApproved: "Godkend onboarding", decisionRejected: "Afvis onboarding",
    dualControlTitle: "4-øjne kontrol", secondaryReviewer: "Sekundær reviewer", fourEyesConfirmed: "Sekundær reviewer har godkendt",
    saveCaseWork: "Gem arbejde", moveNextStage: "Flyt til næste trin", auditTitle: "Audit trail",
    stage_received: "Modtaget", stage_initial: "Indledende review", stage_edd: "EDD-review", stage_qa: "QA-kontrol", stage_decision: "Beslutning",
    mitidSuccess: "MitID-simulation gennemført. Centrale virksomhedsoplysninger er udfyldt.", required: "Udfyld alle obligatoriske felter i dette trin.", needUbo: "Mindst én UBO med ejerandel på 25% eller mere er påkrævet.", eddRequired: "Angiv forklaring til skærpet kundekendskab for risikoflag.", saved: "Fremdrift er gemt i denne browser.", submitted: "Ansøgning er indsendt til intern vurdering.",
    ready: "Klar", missing: "Manglende", escalated: "Eskaleret", approved: "Godkendt", rejected: "Afvist",
    caseSaved: "Sagsarbejde er gemt.", selectCaseFirst: "Vælg først en sag.", stageMoved: "Sagen er flyttet til næste trin.", cannotMoveFinal: "Sagen er allerede i sidste trin.", completionRequired: "For godkend/afvis skal checklist, noter og 4-øjne være opfyldt.",
    permissionDenied: "Aktuel rolle har ikke rettighed til denne beslutning.", rfiSent: "Forespørgsel sendt til kunden.", rfiResolved: "Forespørgsel lukket.",
    riskScore: "Risikoscore", riskModel: "Model", riskStandard: "Standard", riskMedium: "Mellem", riskHigh: "Høj", overdue: "Forfalden"
  }
};

const el = {
  languageSelect: document.getElementById("languageSelect"), tabs: document.querySelectorAll(".tab"), customerView: document.getElementById("customerView"), caseHandlerView: document.getElementById("caseHandlerView"),
  mitidBtn: document.getElementById("mitidBtn"), startManualBtn: document.getElementById("startManualBtn"), mitidStatus: document.getElementById("mitidStatus"), wizardCard: document.getElementById("wizardCard"), form: document.getElementById("cddForm"), steps: document.querySelectorAll(".step"),
  progressText: document.getElementById("progressText"), progressBar: document.getElementById("progressBar"), prevBtn: document.getElementById("prevBtn"), nextBtn: document.getElementById("nextBtn"), submitBtn: document.getElementById("submitBtn"), saveBtn: document.getElementById("saveBtn"),
  addUbo: document.getElementById("addUbo"), uboContainer: document.getElementById("uboContainer"), uboTemplate: document.getElementById("uboTemplate"), reviewSummary: document.getElementById("reviewSummary"), enhancedDueDiligenceWrap: document.getElementById("enhancedDueDiligenceWrap"),
  casesTbody: document.getElementById("casesTbody"), roleSelect: document.getElementById("roleSelect"), queueFilter: document.getElementById("queueFilter"),
  caseWorkbench: document.getElementById("caseWorkbench"), selectedCaseSummary: document.getElementById("selectedCaseSummary"), riskSummary: document.getElementById("riskSummary"), stageTrack: document.getElementById("stageTrack"),
  handlerNotes: document.getElementById("handlerNotes"), checkIdentity: document.getElementById("checkIdentity"), checkOwnership: document.getElementById("checkOwnership"), checkRisk: document.getElementById("checkRisk"), checkDocs: document.getElementById("checkDocs"),
  rfiQuestionText: document.getElementById("rfiQuestionText"), rfiResponseText: document.getElementById("rfiResponseText"), sendRfiBtn: document.getElementById("sendRfiBtn"), resolveRfiBtn: document.getElementById("resolveRfiBtn"),
  decisionSelect: document.getElementById("decisionSelect"), secondaryReviewer: document.getElementById("secondaryReviewer"), fourEyesConfirmed: document.getElementById("fourEyesConfirmed"),
  saveCaseWorkBtn: document.getElementById("saveCaseWorkBtn"), moveNextStageBtn: document.getElementById("moveNextStageBtn"), auditTrail: document.getElementById("auditTrail")
};

const t = (key) => i18n[el.languageSelect.value][key] || key;
const nowIso = () => new Date().toISOString();

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((n) => (n.textContent = t(n.dataset.i18n)));
  renderCases(); refreshStepUI(); renderCaseWorkbench();
}
function showTab(tab) { el.tabs.forEach((b) => b.classList.toggle("active", b.dataset.tab === tab)); el.customerView.classList.toggle("hidden", tab !== "customer"); el.caseHandlerView.classList.toggle("hidden", tab !== "caseHandler"); }
function addAudit(c, action) { c.audit.push({ ts: nowIso(), by: el.roleSelect.value, action }); }

function addUbo(prefill = {}) {
  const row = el.uboTemplate.content.firstElementChild.cloneNode(true);
  row.querySelector('[name="uboName"]').value = prefill.uboName || "";
  row.querySelector('[name="uboOwnership"]').value = prefill.uboOwnership || "";
  row.querySelector('[name="uboCountry"]').value = prefill.uboCountry || "";
  row.querySelector('[name="uboPep"]').value = prefill.uboPep || "";
  row.querySelector(".remove-ubo").addEventListener("click", () => row.remove());
  el.uboContainer.appendChild(row);
  applyTranslations();
}
function startFlow() { el.wizardCard.classList.remove("hidden"); }
function simulateMitId() {
  simulatedMitId = true; startFlow();
  const preset = { companyName: "Nordic Green Solutions ApS", cvr: "41589273", legalForm: "ApS", industry: "Sustainable wholesale trade", address: "Købmagergade 12, 1150 København", country: "Denmark", ceoName: "Mette Jensen", taxResidency: "Denmark", tin: "DK-99887766" };
  Object.entries(preset).forEach(([n, v]) => { if (el.form.elements[n]) el.form.elements[n].value = v; });
  if (!el.uboContainer.children.length) addUbo({ uboName: "Mette Jensen", uboOwnership: "60", uboCountry: "Denmark", uboPep: "no" });
  el.mitidStatus.textContent = t("mitidSuccess"); refreshStepUI();
}
function setStep(target) { currentStep = Math.max(0, Math.min(TOTAL_STEPS - 1, target)); refreshStepUI(); }
function refreshStepUI() {
  el.steps.forEach((s, i) => s.classList.toggle("hidden", i !== currentStep));
  el.progressText.textContent = `${currentStep + 1}/${TOTAL_STEPS}`; el.progressBar.style.width = `${((currentStep + 1) / TOTAL_STEPS) * 100}%`;
  el.prevBtn.disabled = currentStep === 0; el.nextBtn.classList.toggle("hidden", currentStep === TOTAL_STEPS - 1); el.submitBtn.classList.toggle("hidden", currentStep !== TOTAL_STEPS - 1);
  toggleEnhancedDueDiligence(); renderReview();
}

function clearInvalid(scope) { scope.querySelectorAll(".invalid").forEach((n) => n.classList.remove("invalid")); }
function validateStep() {
  const step = el.steps[currentStep]; clearInvalid(step); let ok = true;
  step.querySelectorAll("input[required], select[required], textarea[required]").forEach((n) => {
    const invalid = n.type === "file" ? !(n.files && n.files.length) : !n.checkValidity();
    if (invalid) { n.classList.add("invalid"); ok = false; }
  });
  if (currentStep === 2 && !el.uboContainer.querySelector(".ubo-entry")) { alert(t("needUbo")); return false; }
  if (currentStep === 4 && !el.enhancedDueDiligenceWrap.classList.contains("hidden")) {
    const edd = el.form.elements.eddReason.value.trim(); if (edd.length < 25) { el.form.elements.eddReason.classList.add("invalid"); alert(t("eddRequired")); return false; }
  }
  if (!ok) alert(t("required"));
  return ok;
}
function toggleEnhancedDueDiligence() {
  const flagged = el.form.elements.pep.value === "yes" || el.form.elements.sanctions.value === "yes" || el.form.elements.highRiskCountries.value.trim().length > 0;
  el.enhancedDueDiligenceWrap.classList.toggle("hidden", !flagged); el.form.elements.eddReason.required = flagged;
}
function formToObject() {
  const data = {};
  Array.from(el.form.elements).forEach((n) => { if (!n.name || n.type === "button") return; data[n.name] = n.type === "file" ? n.files?.[0]?.name || "" : n.type === "checkbox" ? n.checked : n.value; });
  data.ubos = [...el.uboContainer.querySelectorAll(".ubo-entry")].map((e) => ({ name: e.querySelector('[name="uboName"]').value, ownership: e.querySelector('[name="uboOwnership"]').value, country: e.querySelector('[name="uboCountry"]').value, pep: e.querySelector('[name="uboPep"]').value }));
  data.simulatedMitId = simulatedMitId; return data;
}
function computeRiskModel(d) {
  let score = 0;
  if (d.pep === "yes") score += 40;
  if (d.sanctions === "yes") score += 50;
  if ((d.highRiskCountries || "").trim()) score += 25;
  if (Number(d.annualTurnover || 0) > 50000000) score += 10;
  d.ubos.forEach((u) => { if (u.pep === "yes") score += 10; });
  const band = score >= 60 ? "high" : score >= 30 ? "medium" : "standard";
  return { score, band };
}
function renderReview() {
  if (currentStep !== TOTAL_STEPS - 1) return;
  const d = formToObject(); const risk = computeRiskModel(d);
  el.reviewSummary.innerHTML = `<div class="card soft"><strong>${d.companyName || "-"}</strong><br>CVR: ${d.cvr || "-"}<br>UBOs: ${d.ubos.length}<br>${t("riskScore")}: ${risk.score} (${t(`risk${risk.band[0].toUpperCase() + risk.band.slice(1)}`)})<br>MitID simulated: ${d.simulatedMitId ? "Yes" : "No"}</div>`;
}
function saveProgress() { localStorage.setItem("cddDemoProgress", JSON.stringify({ currentStep, simulatedMitId, data: formToObject() })); alert(t("saved")); }
function loadProgress() {
  const raw = localStorage.getItem("cddDemoProgress"); if (!raw) return addUbo();
  try {
    const p = JSON.parse(raw); simulatedMitId = !!p.simulatedMitId; startFlow();
    Object.entries(p.data || {}).forEach(([k, v]) => { const n = el.form.elements[k]; if (!n || ["ubos", "simulatedMitId"].includes(k)) return; if (n.type === "checkbox") n.checked = !!v; else if (n.type !== "file") n.value = v; });
    el.uboContainer.innerHTML = ""; (p.data?.ubos || []).forEach((u) => addUbo({ uboName: u.name, uboOwnership: u.ownership, uboCountry: u.country, uboPep: u.pep })); if (!el.uboContainer.children.length) addUbo(); setStep(Number(p.currentStep) || 0);
  } catch { addUbo(); }
}

function statusLabel(status) { return t(status === "escalate" ? "escalated" : status || "ready"); }
function formatSla(c) {
  const hrs = Math.floor((Date.now() - new Date(c.stageEnteredAt).getTime()) / 36e5);
  return `${hrs}h ${hrs > 48 ? `(${t("overdue")})` : ""}`;
}
function queueFilter(c) {
  const q = el.queueFilter.value;
  if (q === "mine") return c.ownerRole === el.roleSelect.value;
  if (q === "overdue") return (Date.now() - new Date(c.stageEnteredAt).getTime()) / 36e5 > 48;
  if (q === "escalated") return c.status === "escalate";
  return true;
}
function renderCases() {
  el.casesTbody.innerHTML = "";
  const visible = cases.filter(queueFilter);
  if (!visible.length) { el.casesTbody.innerHTML = `<tr><td colspan="7">-</td></tr>`; return; }
  visible.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${c.companyName}</td><td>${c.cvr}</td><td>${c.submittedAt}</td><td>${c.riskScore} (${t(`risk${c.riskBand[0].toUpperCase() + c.riskBand.slice(1)}`)})</td><td>${formatSla(c)}</td><td><span class="status-pill ${c.status === "missing" || c.status === "escalate" ? "missing" : "ready"}">${statusLabel(c.status)}</span></td><td><button type="button" class="secondary open-case" data-id="${c.id}">${t("openCase")}</button></td>`;
    el.casesTbody.appendChild(tr);
  });
  document.querySelectorAll(".open-case").forEach((b) => b.addEventListener("click", () => { selectedCaseId = Number(b.dataset.id); renderCaseWorkbench(); }));
}
function getSelectedCase() { return cases.find((c) => c.id === selectedCaseId); }
function renderCaseWorkbench() {
  const c = getSelectedCase();
  if (!c) return el.caseWorkbench.classList.add("hidden");
  el.caseWorkbench.classList.remove("hidden");
  el.selectedCaseSummary.textContent = `${c.companyName} · ${t("stage_" + CASE_STAGES[c.stageIndex])} · owner: ${c.ownerRole}`;
  el.riskSummary.textContent = `${t("riskScore")}: ${c.riskScore} · ${t("riskModel")}=${t(`risk${c.riskBand[0].toUpperCase() + c.riskBand.slice(1)}`)}`;
  el.handlerNotes.value = c.handlerNotes || ""; el.checkIdentity.checked = !!c.checkIdentity; el.checkOwnership.checked = !!c.checkOwnership; el.checkRisk.checked = !!c.checkRisk; el.checkDocs.checked = !!c.checkDocs;
  el.rfiQuestionText.value = c.rfiQuestion || ""; el.rfiResponseText.value = c.rfiResponse || "";
  el.decisionSelect.value = c.status || "ready"; el.secondaryReviewer.value = c.secondaryReviewer || ""; el.fourEyesConfirmed.checked = !!c.fourEyesConfirmed;
  el.stageTrack.innerHTML = ""; CASE_STAGES.forEach((s, i) => { const p = document.createElement("span"); p.className = `stage-pill ${i === c.stageIndex ? "active" : ""}`; p.textContent = t(`stage_${s}`); el.stageTrack.appendChild(p); });
  el.auditTrail.innerHTML = c.audit.slice().reverse().map((a) => `<li>${new Date(a.ts).toLocaleString()} · ${a.by}: ${a.action}</li>`).join("");
}

function canRoleSetDecision(role, decision) {
  if (["approved", "rejected"].includes(decision)) return role === "manager";
  if (decision === "escalate") return role === "analyst" || role === "compliance";
  return true;
}
function saveCaseWork() {
  const c = getSelectedCase(); if (!c) return alert(t("selectCaseFirst"));
  const role = el.roleSelect.value;
  c.handlerNotes = el.handlerNotes.value.trim(); c.checkIdentity = el.checkIdentity.checked; c.checkOwnership = el.checkOwnership.checked; c.checkRisk = el.checkRisk.checked; c.checkDocs = el.checkDocs.checked;
  c.secondaryReviewer = el.secondaryReviewer.value.trim(); c.fourEyesConfirmed = el.fourEyesConfirmed.checked;
  const decision = el.decisionSelect.value || "ready";
  if (!canRoleSetDecision(role, decision)) return alert(t("permissionDenied"));
  const checksDone = c.checkIdentity && c.checkOwnership && c.checkRisk && c.checkDocs;
  if (["approved", "rejected"].includes(decision) && (!checksDone || c.handlerNotes.length < 10 || !c.fourEyesConfirmed || !c.secondaryReviewer)) return alert(t("completionRequired"));
  c.status = decision; c.ownerRole = role; addAudit(c, `Decision set to ${decision}`);
  renderCases(); renderCaseWorkbench(); alert(t("caseSaved"));
}
function moveNextCaseStage() {
  const c = getSelectedCase(); if (!c) return alert(t("selectCaseFirst"));
  if (c.stageIndex >= CASE_STAGES.length - 1) return alert(t("cannotMoveFinal"));
  c.stageIndex += 1; c.stageEnteredAt = nowIso(); addAudit(c, `Moved to ${CASE_STAGES[c.stageIndex]}`);
  renderCaseWorkbench(); renderCases(); alert(t("stageMoved"));
}
function sendRfi() {
  const c = getSelectedCase(); if (!c) return alert(t("selectCaseFirst"));
  c.rfiQuestion = el.rfiQuestionText.value.trim(); if (!c.rfiQuestion) return;
  c.status = "missing"; c.rfiOpen = true; addAudit(c, `RFI opened: ${c.rfiQuestion}`); renderCases(); renderCaseWorkbench(); alert(t("rfiSent"));
}
function resolveRfi() {
  const c = getSelectedCase(); if (!c) return alert(t("selectCaseFirst"));
  c.rfiResponse = el.rfiResponseText.value.trim(); c.rfiOpen = false; addAudit(c, `RFI resolved: ${c.rfiResponse || "no text"}`); renderCaseWorkbench(); alert(t("rfiResolved"));
}

function submitApplication(e) {
  e.preventDefault(); if (!validateStep()) return;
  const d = formToObject(); const r = computeRiskModel(d);
  const c = {
    id: nextCaseId++, companyName: d.companyName, cvr: d.cvr, submittedAt: new Date().toLocaleString(el.languageSelect.value === "da" ? "da-DK" : "en-GB"),
    riskScore: r.score, riskBand: r.band, status: r.band === "high" ? "escalate" : "ready", ownerRole: "analyst", stageIndex: 0,
    createdAt: nowIso(), stageEnteredAt: nowIso(), application: d, handlerNotes: "", checkIdentity: false, checkOwnership: false, checkRisk: false, checkDocs: false,
    rfiOpen: false, rfiQuestion: "", rfiResponse: "", secondaryReviewer: "", fourEyesConfirmed: false,
    audit: [{ ts: nowIso(), by: "system", action: "Case created" }]
  };
  cases.unshift(c); localStorage.removeItem("cddDemoProgress"); renderCases(); alert(t("submitted"));
  el.form.reset(); el.uboContainer.innerHTML = ""; addUbo(); simulatedMitId = false; setStep(0);
}

el.languageSelect.addEventListener("change", applyTranslations);
el.tabs.forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));
el.roleSelect.addEventListener("change", () => { renderCases(); renderCaseWorkbench(); });
el.queueFilter.addEventListener("change", renderCases);
el.mitidBtn.addEventListener("click", simulateMitId); el.startManualBtn.addEventListener("click", startFlow); el.addUbo.addEventListener("click", () => addUbo());
el.prevBtn.addEventListener("click", () => setStep(currentStep - 1)); el.nextBtn.addEventListener("click", () => validateStep() && setStep(currentStep + 1)); el.saveBtn.addEventListener("click", saveProgress); el.form.addEventListener("submit", submitApplication);
el.form.elements.pep.addEventListener("change", toggleEnhancedDueDiligence); el.form.elements.sanctions.addEventListener("change", toggleEnhancedDueDiligence); el.form.elements.highRiskCountries.addEventListener("input", toggleEnhancedDueDiligence);
el.saveCaseWorkBtn.addEventListener("click", saveCaseWork); el.moveNextStageBtn.addEventListener("click", moveNextCaseStage); el.sendRfiBtn.addEventListener("click", sendRfi); el.resolveRfiBtn.addEventListener("click", resolveRfi);

loadProgress(); applyTranslations(); refreshStepUI();
