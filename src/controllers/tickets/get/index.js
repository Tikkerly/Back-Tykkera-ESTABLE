const Ticket = require("../../../models/Ticket");
const User = require("../../../models/User");
const { parse, format, getYear } = require('date-fns');
const esLocale = require('date-fns/locale/es')

const getTicketsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({ company_id: id }),
      Ticket.find({ company_id: id })
        .populate("company_id")
        .populate("serviceClient_id")
        .populate("finalClient_id")
        .populate("technician_id"),
    ]);
    return res.status(200).json({ total, tickets });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};
// api/v1/tickets/agent/:id
const getTicketsByAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({ serviceClient_id: id }),
      Ticket.find({ serviceClient_id: id })
        .populate("company_id")
        .populate("finalClient_id")
        .populate("serviceClient_id")
        .populate("technician_id"),
    ]);
    return res.status(200).json({ total, tickets });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const [tickets] = await Promise.all([
      Ticket.find({ _id: id })
        .populate("company_id")
        .populate("finalClient_id")
        .populate("serviceClient_id")
        .populate("technician_id"),
    ]);
    return res.status(200).json(tickets[0]);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const getTicketsByTechnician = async (req, res) => {
  try {
    const { id, companyId } = req.params;
    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({ technician_id: id, company_id: companyId }),
      Ticket.find({ technician_id: id, company_id: companyId })
        .populate("company_id")
        .populate("finalClient_id")
        .populate("serviceClient_id")
        .populate("technician_id"),
    ]);
    return res.status(200).json({ total, tickets });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const statusGraph = async (req, res) => {
  const { id } = req.params;
  try {
    const tickets = await Ticket.find({ company_id: id })
    const labels = ["Completado", "Pendiente", "Cancelado"];
    const totalCompleted = tickets.filter(ticket => ticket.ticketStatus === "Completado").length;
    const totalPendant = tickets.filter(ticket => ticket.ticketStatus === "Pendiente").length;
    const totalCancelled = tickets.filter(ticket => ticket.ticketStatus === "Cancelado").length;
    const dataGraph = {
      labels,
      datasets: [
        {
          label: 'Completado',
          backgroundColor: 'green',
          data: [totalCompleted, 0, 0]
        },
        {
          label: 'Pendiente',
          backgroundColor: 'yellow',
          data: [0, totalPendant, 0]
        },
        {
          label: 'Cancelado',
          backgroundColor: 'red',
          data: [0, 0, totalCancelled]
        }
      ]
    }
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cantidad',
            color: 'black',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Tickets',
            color: 'black'
          },
        }
      }
    }
    return res.status(200).json({ dataGraph, options })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const utilityMonthGraph = async (req, res) => {
  const { id } = req.params;
  const year = getYear(new Date());
  try {
    let tickets = await Ticket.find({ company_id: id });
    tickets = tickets.filter(ticket => ticket.ticketStatus === 'Completado')
    let monthAndUtility = tickets.map(ticket => {
      const utility = Number(ticket.utility);
      const date = parse(ticket.endDate, 'yyyy-MM-dd', new Date());
      const year = getYear(date)
      let month = format(date, 'MMMM', { locale: esLocale })
      month = [month[0], month.slice(1)];
      month[0] = month[0].toUpperCase();
      month = month.join('');
      return { month, utility, year }
    })
    monthAndUtility = monthAndUtility.filter(element => element.year === year)
    const labels = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
    let utilityForMonth = [];
    for (let i = 0; i < labels.length; i++) {
      let utility = 0;
      for (let j = 0; j < monthAndUtility.length; j++) {
        if (labels[i] === monthAndUtility[j].month) {
          utility = utility + monthAndUtility[j].utility
        }
      }
      utilityForMonth[i] = utility
    }
    const dataGraph = {
      labels,
      datasets: [
        {
          label: 'Utilidad',
          backgroundColor: 'blue',
          data: utilityForMonth
        },
      ]
    }
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cantidad ($)',
            color: 'black',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Mes',
            color: 'black'
          },
        }
      }
    }
    return res.status(200).json({ dataGraph, options })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const accumulatedUtility = async (req, res) => {
  const { id } = req.params;
  const year = getYear(new Date());
  try {
    let tickets = await Ticket.find({ company_id: id });
    tickets = tickets.filter(ticket => ticket.ticketStatus === 'Completado')
    let monthAndUtility = tickets.map(ticket => {
      const utility = Number(ticket.utility);
      const date = parse(ticket.endDate, 'yyyy-MM-dd', new Date());
      const year = getYear(date)
      let month = format(date, 'MMMM', { locale: esLocale })
      month = [month[0], month.slice(1)];
      month[0] = month[0].toUpperCase();
      month = month.join('');
      return { month, utility, year }
    })
    monthAndUtility = monthAndUtility.filter(element => element.year === year)
    const labels = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
    let accumulatedArray = [];
    let utility = 0;
    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < monthAndUtility.length; j++) {
        if (labels[i] === monthAndUtility[j].month) {
          utility = utility + monthAndUtility[j].utility
        }
      }
      accumulatedArray[i] = utility;
    }
    const dataGraph = {
      labels,
      datasets: [
        {
          label: 'Utilidad',
          backgroundColor: 'blue',
          data: accumulatedArray
        },
      ]
    }
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cantidad ($)',
            color: 'black',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Mes',
            color: 'black'
          },
        }
      }
    }
    return res.status(200).json({ dataGraph, options })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getTicketsByUser,
  getTicketsByAgent,
  getTicketById,
  getTicketsByTechnician,
  statusGraph,
  utilityMonthGraph,
  accumulatedUtility
};
